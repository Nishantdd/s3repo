import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const adwaitaSans = localFont({
    src: '../../public/AdwaitaSans-Regular.ttf',
    variable: '--font-adwaita-sans'
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
        <html lang="en" className={`${adwaitaSans.className} ${adwaitaSans.variable} ${geistMono.variable}`}>
            <body className="antialiased">
                {children}
                <Toaster
                    position="bottom-center"
                    offset="0px"
                    mobileOffset="0px"
                    toastOptions={{
                        className: '!bg-background/80 !backdrop-blur-md !font-sans',
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
