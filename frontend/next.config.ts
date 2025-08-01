import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        reactCompiler: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.cloudfront.net',
                pathname: '/**',
                port: ''
            }
        ]
    }
};

export default nextConfig;
