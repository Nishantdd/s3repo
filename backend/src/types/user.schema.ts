import { Type, Static } from '@fastify/type-provider-typebox';

const S3CredentialsSchema = Type.Object({
    accessKey: Type.String({ minLength: 1 }),
    secretAccessKey: Type.String({ minLength: 1 }),
    bucketName: Type.String({ minLength: 1 }),
    bucketRegion: Type.String({ minLength: 1 }),
    cloudfrontDomainUrl: Type.String()
});

export const fileUploadValidation = {
    body: Type.Intersect([
        S3CredentialsSchema,
        Type.Object({
            filename: Type.String({ minLength: 3 })
        })
    ])
};

export const updateS3CredentialsValidation = {
    body: S3CredentialsSchema
};

export type S3Credentials = Static<typeof S3CredentialsSchema>;
