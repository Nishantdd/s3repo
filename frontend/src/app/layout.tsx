import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const interSans = Inter({
    variable: '--font-inter-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'S3Repo',
    description: 'An S3 wrapper repository for storing images'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${interSans.className} ${interSans.variable} ${geistMono.variable} antialiased`}>
                {children}
                <Toaster
                    position="bottom-center"
                    offset={'0px'}
                    toastOptions={{
                        className: '!bg-[background]/80 !backdrop-blur-xs',
                        style: {
                            borderBottomLeftRadius: '0px',
                            borderBottomRightRadius: '0px'
                        }
                    }}
                />
            </body>
        </html>
    );
}
