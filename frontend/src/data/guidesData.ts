import { guideData } from '@/types/guideData';

export const guidesData: guideData[] = [
    {
        title: 'Getting Started',
        slug: 'getting-started',
        items: [
            { title: 'AWS Account Setup', slug: 'account-setup' },
            { title: 'AWS Console', slug: 'aws-console' },
            { title: 'AWS Services', slug: 'aws-services' },
            { title: 'Setting Up Budget', slug: 'budget-setup' }
        ]
    },
    {
        title: 'Storage Services',
        slug: 'storage',
        items: [
            { title: 'Create S3 Bucket', slug: 'create-bucket' },
            { title: 'Bucket Permissions', slug: 'bucket-permissions' },
            { title: 'Upload Files to S3', slug: 'upload-files' }
        ]
    },
    {
        title: 'CDN Services',
        slug: 'cdn',
        items: [
            { title: 'Cloudfront Introduction', slug: 'cdn-intro' },
            { title: 'Create Cloudfront Distribution', slug: 'create-cdn' }
        ]
    },
    {
        title: 'IAM',
        slug: 'iam',
        items: [
            { title: 'Policies and Users Introduction', slug: 'iam-intro' },
            { title: 'Create New Policy', slug: 'create-policy' },
            { title: 'Create New User', slug: 'create-user' },
            { title: 'Creating Access Keys For User', slug: 'access-keys' }
        ]
    },
    {
        title: 'S3Repo',
        slug: 's3repo',
        items: [{ title: 'Setup Credentials', slug: 'set-credentials' }]
    }
];
