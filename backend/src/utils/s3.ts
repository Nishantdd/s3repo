import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

function createS3Client(accessKey: string, secretAccessKey: string, bucketRegion: string) {
    return new S3Client({
        credentials: {
            accessKeyId: accessKey,
            secretAccessKey: secretAccessKey
        },
        region: bucketRegion
    });
}

export async function getPutObjectSigned({
    accessKey,
    secretAccessKey,
    bucketRegion,
    bucketName,
    filename
}: {
    accessKey: string;
    secretAccessKey: string;
    bucketRegion: string;
    bucketName: string;
    filename: string;
}): Promise<string> {
    const s3 = createS3Client(accessKey, secretAccessKey, bucketRegion);

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: filename
    });

    try {
        const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
        return signedUrl;
    } catch {
        return '';
    }
}
