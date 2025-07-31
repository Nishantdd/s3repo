'use client';

import { useEffect, useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DetailsPane } from '@/components/DetailsPane';
import { Navbar } from '@/components/Navbar';
import { ImageGallery } from '@/components/ImageGallery';
import GroupData from '@/types/groupData';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import { Loading } from '@/components/Loading';
import Account from '@/components/Account';
import S3Credentials from '@/types/s3Credentials';

const sampleGroupData: GroupData[] = [
    {
        name: 'Landscapes',
        images: [
            {
                id: 1,
                src: '/placeholder.svg?height=200&width=200',
                name: 'landscape-1.jpg',
                size: '2.5MB',
                created: '2024-01-15',
                updated: '2024-01-16'
            },
            {
                id: 3,
                src: '/placeholder.svg?height=150&width=300',
                name: 'nature-scene.jpg',
                size: '3.2MB',
                created: '2024-01-13',
                updated: '2024-01-15'
            }
        ]
    },
    {
        name: 'Portraits',
        images: [
            {
                id: 2,
                src: '/placeholder.svg?height=300&width=200',
                name: 'portrait-1.jpg',
                size: '1.8MB',
                created: '2024-01-14',
                updated: '2024-01-14'
            },
            {
                id: 5,
                src: '/placeholder.svg?height=200&width=250',
                name: 'abstract-1.jpg',
                size: '1.5MB',
                created: '2024-01-11',
                updated: '2024-01-13'
            },
            {
                id: 6,
                src: '/placeholder.svg?height=180&width=180',
                name: 'food-shot.jpg',
                size: '1.9MB',
                created: '2024-01-10',
                updated: '2024-01-10'
            },
            {
                id: 7,
                src: '/placeholder.svg?height=220&width=300',
                name: 'building-1.jpg',
                size: '2.8MB',
                created: '2024-01-09',
                updated: '2024-01-11'
            },
            {
                id: 8,
                src: '/placeholder.svg?height=160&width=200',
                name: 'wildlife-1.jpg',
                size: '2.3MB',
                created: '2024-01-08',
                updated: '2024-01-08'
            }
        ]
    }
];

export default function HomePage() {
    const [selectedImage, setSelectedImage] = useState(sampleGroupData[0]['images'][0]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [s3Credentials, setS3Credentials] = useState<S3Credentials>({
        accessKey: '',
        bucketName: '',
        bucketRegion: '',
        secretAccessKey: ''
    });

    useEffect(() => {
        const fetchS3Credentials = async () => {
            await fetch(`http://localhost:8000/get-s3-credentials`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                cache: 'force-cache',
                next: { revalidate: 600 }
            })
                .then(res => res.json())
                .then(res => setS3Credentials(res.data))
                .catch(err => console.error(err.message));
        };

        fetchS3Credentials();
    }, []);

    const { data: session, isPending, error } = authClient.useSession();

    if (isPending) return <Loading />;
    if (!session || error) return redirect('/login');

    if (isAccountOpen) return <Account s3Credentials={s3Credentials} setIsAccountOpen={setIsAccountOpen} />;

    return (
        <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider
                defaultOpen={true}
                className="flex flex-col"
                style={
                    {
                        '--sidebar-width': '20rem',
                        '--sidebar-width-mobile': '18rem'
                    } as React.CSSProperties
                }>
                <Navbar
                    setIsAccountOpen={setIsAccountOpen}
                    groups={sampleGroupData.map(groupData => groupData.name)}
                    onGroupSelect={setSelectedGroup}
                />
                <div className="flex flex-1">
                    <DetailsPane selectedImage={selectedImage} />
                    <main className="flex-1 overflow-auto p-6">
                        <ImageGallery
                            groupData={sampleGroupData.find(groupData => groupData.name === selectedGroup)}
                            selectedImage={selectedImage}
                            onImageSelect={setSelectedImage}
                        />
                    </main>
                </div>
            </SidebarProvider>
        </div>
    );
}
