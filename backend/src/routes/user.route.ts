import { fileUploadValidation, updateS3CredentialsValidation } from '../types/user.schema.js';
import { auth } from '../utils/auth.js';
import { db } from '../db/drizzle.js';
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { getPutObjectSigned } from '../utils/s3.js';
import { user } from '../db/schema.js';
import { eq } from 'drizzle-orm';

const userRoutes: FastifyPluginAsyncTypebox = async fastify => {
    fastify.route({
        method: 'GET',
        url: '/get-s3-credentials',
        handler: async (request, reply) => {
            const body = request.body;

            // Authenticate userId
            const session = await auth.api.getSession({
                headers: new Headers(Object.entries(request.headers) as [string, string][])
            });
            if (!session) return reply.status(401).send({ error: 'User not authenticated' });

            // Get s3 credentials from user session
            const result = {
                bucketName: session.user.bucketName,
                bucketRegion: session.user.bucketRegion,
                accessKey: session.user.accessKey,
                secretAccessKey: session.user.decryptedSecretAccessKey
            };
            reply.status(200).send({ message: 'S3 credentials fetched successfully', data: result });
        }
    });

    fastify.route({
        method: 'PATCH',
        url: '/update-s3-credentials',
        schema: updateS3CredentialsValidation,
        handler: async (request, reply) => {
            const body = request.body;

            // Authenticate user
            const session = await auth.api.getSession({
                headers: new Headers(Object.entries(request.headers) as [string, string][])
            });
            if (!session) return reply.status(401).send({ error: 'User not authenticated' });

            // Update s3 credentials in db
            const userId = session.user.id;
            try {
                const result = await db
                    .update(user)
                    .set({
                        bucketName: body.bucketName,
                        bucketRegion: body.bucketRegion,
                        accessKey: body.accessKey,
                        secretAccessKey: body.secretAccessKey,
                        updatedAt: new Date()
                    })
                    .where(eq(user.id, userId))
                    .returning();

                if (result.length === 0) {
                    return reply.status(404).send({ error: 'User not found or credentials could not be updated.' });
                }

                reply.status(200).send({ message: 'S3 credentials updated successfully', data: result[0] });
            } catch (error) {
                fastify.log.error('Error upserting S3 credentials:', error);
                reply.status(500).send({ error: 'Failed to update/insert S3 credentials' });
            }
        }
    });

    fastify.route({
        method: 'POST',
        url: '/file-upload',
        schema: fileUploadValidation,
        handler: async (request, reply) => {
            const body = request.body;

            // Authenticate user
            const session = await auth.api.getSession({
                headers: new Headers(Object.entries(request.headers) as [string, string][])
            });
            if (!session) return reply.status(401).send({ error: 'User not authenticated' });

            // Get signed url for uploading file
            const url = await getPutObjectSigned({ ...body });
            if (!url) return reply.status(500).send({ error: `Couldn't upload file: ${body.filename}` });

            return reply.status(200).send({ message: 'Upload url created', data: url });
        }
    });
};

export default userRoutes;
