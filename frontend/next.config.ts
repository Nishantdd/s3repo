import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        reactCompiler: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3repo-drive.s3.ap-south-1.amazonaws.com',
                pathname: '/**',
                port: ''
            }
        ]
    }
};

export default nextConfig;
