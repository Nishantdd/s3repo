import { PutObjectCommand, S3Client, ListObjectsV2Command, GetObjectCommand, _Object } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Credentials } from '../types/user.schema.js';
import { ImageDetails } from '../types/image.schema.js';
import { config } from './config.js';

/**
 * Helper to format file size from bytes to a readable string.
 * @param bytes - Number of Bytes
 * @param decimals - Number of decimals
 * @returns formatted object size
 */
const formatBytes = (bytes: number, decimals = 2): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

/**
 * Creates an S3 client instance from provided credentials.
 * @param credentials - The user's S3 access credentials.
 * @returns aws-sdk v3 s3client
 */
const getS3Client = (credentials: S3Credentials) => {
    return new S3Client({
        region: credentials.bucketRegion,
        credentials: {
            accessKeyId: credentials.accessKey,
            secretAccessKey: credentials.secretAccessKey
        }
    });
};

/**
 * Lists all "folders" (common prefixes) in an S3 bucket.
 * In S3, folders are simulated by object keys containing a delimiter like '/'.
 * @param credentials - The user's S3 access credentials.
 * @returns A promise that resolves to an array of folder names.
 */
export const listFoldersInBucket = async (credentials: S3Credentials): Promise<string[]> => {
    const s3Client = getS3Client(credentials);
    const command = new ListObjectsV2Command({
        Bucket: credentials.bucketName,
        Delimiter: '/'
    });

    const response = await s3Client.send(command);
    // Extracts the folder names from the CommonPrefixes array and removes the trailing '/'
    return response.CommonPrefixes?.map(prefix => prefix.Prefix!.slice(0, -1)) || [];
};

/**
 * Generates cloudfront cdn url for all images within a specific folder.
 * @param credentials - The user's S3 access credentials.
 * @param folderName - The name of the folder to retrieve images from.
 * @returns A promise that resolves to an array of image details.
 */
export const getCloudfrontImagesUrlFromFolder = async (
    credentials: S3Credentials,
    folderName: string
): Promise<ImageDetails[]> => {
    const s3Client = getS3Client(credentials);
    const command = new ListObjectsV2Command({
        Bucket: credentials.bucketName,
        Prefix: `${folderName}/`
    });

    const { Contents } = await s3Client.send(command);
    if (!Contents) return [];

    // Filter out the folder placeholder object itself, which has a size of 0.
    const imageObjects = Contents.filter(obj => obj.Size && obj.Size > 0);

    const cdnImagePromises = imageObjects.map(async (obj: _Object) => {
        return {
            id: obj.ETag!.replace(/"/g, ''), // Use the object's ETag as a unique ID
            src: `${config.CLOUDFRONT_DOMAIN_URL}/${obj.Key}`,
            name: obj.Key!.split('/').pop()!,
            size: formatBytes(obj.Size!),
            created: obj.LastModified!.toISOString(),
            updated: obj.LastModified!.toISOString() // S3 only provides LastModified
        };
    });

    return Promise.all(cdnImagePromises);
};

/**
 * Generates temporary, presigned GET URLs for all images within a specific folder.
 * @param credentials - The user's S3 access credentials.
 * @param folderName - The name of the folder to retrieve images from.
 * @returns A promise that resolves to an array of image details.
 */
export const getSignedImagesUrlFromFolder = async (
    credentials: S3Credentials,
    folderName: string
): Promise<ImageDetails[]> => {
    const s3Client = getS3Client(credentials);
    const command = new ListObjectsV2Command({
        Bucket: credentials.bucketName,
        Prefix: `${folderName}/`
    });

    const { Contents } = await s3Client.send(command);
    if (!Contents) return [];

    // Filter out the folder placeholder object itself, which has a size of 0.
    const imageObjects = Contents.filter(obj => obj.Size && obj.Size > 0);

    const signedImagePromises = imageObjects.map(async (obj: _Object) => {
        const getObjectCommand = new GetObjectCommand({
            Bucket: credentials.bucketName,
            Key: obj.Key
        });

        // Create a temporary URL valid for 30 minutes
        const url = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 1800 });

        return {
            id: obj.ETag!.replace(/"/g, ''), // Use the object's ETag as a unique ID
            src: url,
            name: obj.Key!.split('/').pop()!,
            size: formatBytes(obj.Size!),
            created: obj.LastModified!.toISOString(),
            updated: obj.LastModified!.toISOString() // S3 only provides LastModified
        };
    });

    return Promise.all(signedImagePromises);
};

/**
 * Generates temporary, presigned PUT URL for provided image (Uses intelligent tiering for storage).
 * @param credentials - The user's S3 access credentials.
 * @param filename - The name of the file to upload.
 * @returns A promise that resolves to signed url string.
 */
export async function getPutObjectSigned(credentials: S3Credentials, filename: string): Promise<string> {
    const s3 = getS3Client(credentials);

    const command = new PutObjectCommand({
        Bucket: credentials.bucketName,
        Key: filename,
        StorageClass: 'INTELLIGENT_TIERING'
    });

    try {
        const signedUrl = await getSignedUrl(s3, command, { expiresIn: 1800 });
        return signedUrl;
    } catch {
        return '';
    }
}
