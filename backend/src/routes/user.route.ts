import { fileUploadValidation } from '../types/user.schema.js';
import { auth } from '../utils/auth.js';
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { getPutObjectSigned } from '../utils/s3.js';

const userRoutes: FastifyPluginAsyncTypebox = async fastify => {
    fastify.route({
        method: 'POST',
        url: '/file-upload',
        schema: fileUploadValidation,
        handler: async (request, reply) => {
            // Get body and file
            const body = request.body;

            // Authenticate user
            const session = await auth.api.getSession({
                headers: new Headers(Object.entries(request.headers) as [string, string][])
            });
            if (!session) return reply.status(401).send({ error: 'User not authenticated' });

            // Get signed url for uploading file
            const url = await getPutObjectSigned({ ...body });
            if (!url) return reply.status(500).send({ error: `Couldn't upload file: ${body.filename}` });

            return reply.status(200).send({ data: url });
        }
    });
};

export default userRoutes;
