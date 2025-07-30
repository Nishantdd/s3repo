import { Type } from '@fastify/type-provider-typebox';

const S3Credentials = Type.Object({
    accessKey: Type.String({ minLength: 1 }),
    secretAccessKey: Type.String({ minLength: 1 }),
    bucketName: Type.String({ minLength: 1 }),
    bucketRegion: Type.String({ minLength: 1 })
});

export const fileUploadValidation = {
    body: Type.Intersect([
        S3Credentials,
        Type.Object({
            filename: Type.String({ minLength: 3 })
        })
    ])
};

export const updateS3CredentialsValidation = {
    body: S3Credentials
};
