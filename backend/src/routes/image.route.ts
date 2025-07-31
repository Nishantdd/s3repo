import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { Static, Type } from '@fastify/type-provider-typebox';
import { auth } from '../utils/auth.js';
import { listFoldersInBucket, getSignedImagesUrlFromFolder } from '../utils/s3.js';
import { S3Credentials } from '../types/user.schema.js';
import { getImagesFromGroupNameValidator, GroupData } from '../types/image.schema.js';

const imageRoutes: FastifyPluginAsyncTypebox = async fastify => {
    fastify.route({
        method: 'GET',
        url: '/groups',
        handler: async (request, reply) => {
            // Authenticate user and get session
            const session = await auth.api.getSession({
                headers: new Headers(Object.entries(request.headers) as [string, string][])
            });
            if (!session?.user) return reply.status(401).send({ error: 'User not authenticated' });

            const { bucketName, bucketRegion, accessKey, decryptedSecretAccessKey } = session.user;

            // Ensure user has configured their S3 credentials
            if (!bucketName || !bucketRegion || !accessKey || !decryptedSecretAccessKey)
                return reply.status(400).send({ error: 'S3 credentials are not configured.' });

            const credentials: S3Credentials = {
                bucketName,
                bucketRegion,
                accessKey,
                secretAccessKey: decryptedSecretAccessKey
            };

            try {
                // Get all folder names from the S3 bucket
                const folderNames = await listFoldersInBucket(credentials);

                // Concurrently fetch images for each folder
                const groupDataPromises = folderNames.map(async (name): Promise<GroupData> => {
                    const images = await getSignedImagesUrlFromFolder(credentials, name);
                    return { name, images };
                });

                const allGroupData = await Promise.all(groupDataPromises);

                reply.status(200).send({ message: 'Image groups fetched successfully', data: allGroupData });
            } catch (error) {
                fastify.log.error(`Error fetching image groups from S3: ${error}`);
                reply.status(500).send({ error: 'Failed to fetch image groups from S3.' });
            }
        }
    });

    fastify.route({
        method: 'GET',
        url: '/images/:groupName',
        schema: getImagesFromGroupNameValidator,
        handler: async (request, reply) => {
            const { groupName } = request.params;

            // Authenticate user
            const session = await auth.api.getSession({
                headers: new Headers(Object.entries(request.headers) as [string, string][])
            });
            if (!session?.user) {
                return reply.status(401).send({ error: 'User not authenticated' });
            }

            const { bucketName, bucketRegion, accessKey, decryptedSecretAccessKey } = session.user;

            // Validate credentials
            if (!bucketName || !bucketRegion || !accessKey || !decryptedSecretAccessKey) {
                return reply.status(400).send({ error: 'S3 credentials are not configured.' });
            }
            const credentials: S3Credentials = {
                bucketName,
                bucketRegion,
                accessKey,
                secretAccessKey: decryptedSecretAccessKey
            };

            try {
                // Fetch images only for the specified group
                const images = await getSignedImagesUrlFromFolder(credentials, groupName);
                reply
                    .status(200)
                    .send({ message: `Images for group '${groupName}' fetched successfully`, data: images });
            } catch (error) {
                fastify.log.error(`Error fetching images for group ${groupName}:`, error);
                reply.status(500).send({ error: `Failed to fetch images for group ${groupName}.` });
            }
        }
    });
};

export default imageRoutes;
