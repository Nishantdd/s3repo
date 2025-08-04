import { Type, Static } from '@fastify/type-provider-typebox';

const ImageSchema = Type.Object({
    id: Type.String(),
    src: Type.String({ format: 'uri' }),
    name: Type.String(),
    size: Type.String(),
    created: Type.String({ format: 'date-time' }),
    updated: Type.String({ format: 'date-time' })
});

const GroupDataSchema = Type.Object({
    name: Type.String(),
    images: Type.Array(ImageSchema)
});

export const getImagesFromGroupNameValidator = {
    params: Type.Object({
        groupName: Type.String()
    })
};

export const generateUploadUrlValidator = {
    body: Type.Object({
        groupName: Type.String({ minLength: 1 }),
        filename: Type.String({ minLength: 1 }),
        contentType: Type.String({ minLength: 1, description: 'The MIME type of the file.' })
    })
};

export const deleteImageFromGroupNameValidator = {
    body: Type.Object({
        groupName: Type.String(),
        imageName: Type.String()
    })
};

export type GroupData = Static<typeof GroupDataSchema>;
export type ImageDetails = Static<typeof ImageSchema>;
