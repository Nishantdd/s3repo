import { featuredGuide } from '@/types/featuredGuide';
import { Box, Database, Key, Shield } from 'lucide-react';

export const featuredGuides: featuredGuide[] = [
    {
        title: 'AWS Account Setup',
        description: 'Step-by-step guide for creating a new AWS Free-tier account',
        href: '/guides/getting-started/account-setup',
        icon: Box,
        category: 'Account'
    },
    {
        title: 'Create S3 Bucket',
        description: 'Learn how to create and configure your first S3 bucket for secure file storage.',
        href: '/guides/storage/create-bucket',
        icon: Database,
        category: 'Storage'
    },
    {
        title: 'IAM Basics',
        description: 'Understand AWS Identity and Access Management fundamentals for security.',
        href: '/guides/getting-started/iam-basics',
        icon: Shield,
        category: 'Security'
    },
    {
        title: 'Access Key',
        description: 'Create and manage AWS access keys for programmatic access.',
        href: '/guides/iam/access-keys',
        icon: Key,
        category: 'Security'
    }
];
