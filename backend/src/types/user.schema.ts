import { Type } from '@fastify/type-provider-typebox';

export const fileUploadValidation = {
    body: Type.Object({
        accessKey: Type.String(),
        secretAccessKey: Type.String(),
        bucketName: Type.String(),
        bucketRegion: Type.String(),
        filename: Type.String()
    }),
};
