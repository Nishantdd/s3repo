import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { auth } from '../utils/auth.js';
import {
    listGroupsInBucket,
    getCloudfrontImagesUrlFromGroup,
    deleteImageFromFolder,
    getPutObjectUrlSigned
} from '../utils/s3.js';
import { S3Credentials } from '../types/user.schema.js';
import {
    deleteImageFromGroupNameValidator,
    generateUploadUrlValidator,
    getImagesFromGroupNameValidator,
    GroupData
} from '../types/image.schema.js';
import path from 'path';

const imageRoutes: FastifyPluginAsyncTypebox = async fastify => {
    fastify.route({
        method: 'GET',
        url: '/images',
        handler: async (request, reply) => {
            // Authenticate user and get session
            const session = await auth.api.getSession({
                headers: new Headers(Object.entries(request.headers) as [string, string][])
            });
            if (!session?.user) return reply.status(401).send({ error: 'User not authenticated' });

            const { bucketName, bucketRegion, accessKey, decryptedSecretAccessKey, cloudfrontDomainUrl } = session.user;

            // Ensure user has configured their S3 credentials
            if (!bucketName || !bucketRegion || !accessKey || !decryptedSecretAccessKey || !cloudfrontDomainUrl)
                return reply.status(400).send({ error: 'S3 credentials are not configured.' });

            const credentials: S3Credentials = {
                bucketName,
                bucketRegion,
                accessKey,
                secretAccessKey: decryptedSecretAccessKey,
                cloudfrontDomainUrl: cloudfrontDomainUrl
            };

            try {
                // Get all folder names from the S3 bucket
                const folderNames = await listGroupsInBucket(credentials);

                // Concurrently fetch images for each folder
                const groupDataPromises = folderNames.map(async (name): Promise<GroupData> => {
                    const images = await getCloudfrontImagesUrlFromGroup(credentials, name);
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

            const { bucketName, bucketRegion, accessKey, decryptedSecretAccessKey, cloudfrontDomainUrl } = session.user;

            // Validate credentials
            if (!bucketName || !bucketRegion || !accessKey || !decryptedSecretAccessKey || !cloudfrontDomainUrl) {
                return reply.status(400).send({ error: 'S3 credentials are not configured.' });
            }

            const credentials: S3Credentials = {
                bucketName,
                bucketRegion,
                accessKey,
                secretAccessKey: decryptedSecretAccessKey,
                cloudfrontDomainUrl: cloudfrontDomainUrl
            };

            try {
                // Fetch images only for the specified group
                const images = await getCloudfrontImagesUrlFromGroup(credentials, groupName);
                reply
                    .status(200)
                    .send({ message: `Images for group '${groupName}' fetched successfully`, data: images });
            } catch (error) {
                fastify.log.error(`Error fetching images for group ${groupName}:`, error);
                reply.status(500).send({ error: `Failed to fetch images for group ${groupName}.` });
            }
        }
    });

    fastify.route({
        method: 'POST',
        url: '/generate-upload-url',
        schema: generateUploadUrlValidator,
        handler: async (request, reply) => {
            // Authenticate user and get credentials
            const session = await auth.api.getSession({
                headers: new Headers(Object.entries(request.headers) as [string, string][])
            });
            if (!session?.user) {
                return reply.status(401).send({ error: 'User not authenticated' });
            }

            const { bucketName, bucketRegion, accessKey, decryptedSecretAccessKey, cloudfrontDomainUrl } = session.user;

            // Validate credentials
            if (!bucketName || !bucketRegion || !accessKey || !decryptedSecretAccessKey || !cloudfrontDomainUrl) {
                return reply.status(400).send({ error: 'S3 credentials are not configured.' });
            }

            const credentials: S3Credentials = {
                bucketName,
                bucketRegion,
                accessKey,
                secretAccessKey: decryptedSecretAccessKey,
                cloudfrontDomainUrl: cloudfrontDomainUrl
            };

            // Get file metadata from request body
            const { groupName, filename, contentType } = request.body;
            const s3Key = path.join(groupName, filename);

            // 4. Generate the pre-signed URL
            try {
                const signedUrl = await getPutObjectUrlSigned(credentials, s3Key, contentType);
                if (signedUrl) {
                    reply.status(200).send({ signedUrl });
                } else {
                    reply.status(500).send({ error: 'Failed to generate upload URL.' });
                }
            } catch (error) {
                fastify.log.error(`Error in /generate-upload-url for key ${s3Key}:`, error);
                reply.status(500).send({ error: 'An unexpected server error occurred.' });
            }
        }
    });

    fastify.route({
        method: 'DELETE',
        url: '/image',
        schema: deleteImageFromGroupNameValidator,
        handler: async (request, reply) => {
            const body = request.body;

            // Authenticate user
            const session = await auth.api.getSession({
                headers: new Headers(Object.entries(request.headers) as [string, string][])
            });
            if (!session?.user) {
                return reply.status(401).send({ error: 'User not authenticated' });
            }

            const { bucketName, bucketRegion, accessKey, decryptedSecretAccessKey, cloudfrontDomainUrl } = session.user;

            // Validate credentials
            if (!bucketName || !bucketRegion || !accessKey || !decryptedSecretAccessKey || !cloudfrontDomainUrl) {
                return reply.status(400).send({ error: 'S3 credentials are not configured.' });
            }

            const credentials: S3Credentials = {
                bucketName,
                bucketRegion,
                accessKey,
                secretAccessKey: decryptedSecretAccessKey,
                cloudfrontDomainUrl: cloudfrontDomainUrl
            };

            const isDeleted = await deleteImageFromFolder(credentials, body.groupName, body.imageName);
            if (isDeleted) reply.status(200).send({ message: `Image ${body.imageName} deleted successfully` });
            else reply.status(500).send({ error: `Failed to delete image ${body.imageName}.` });
        }
    });
};

export default imageRoutes;
