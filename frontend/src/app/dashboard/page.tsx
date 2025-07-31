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
import ImageData from '@/types/imageData';

export default function HomePage() {
    const [groupsData, setGroupsData] = useState<GroupData[]>([]);
    const [selectedImage, setSelectedImage] = useState<ImageData>();
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

        const getGroupsList = async () => {
            await fetch(`http://localhost:8000/groups`, {
                method: 'GET',
                credentials: 'include'
            })
                .then(res => res.json())
                .then(res => setGroupsData(res.data || []))
                .catch(err => console.error(err.message));
        };

        fetchS3Credentials();
        getGroupsList();
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
                    groups={groupsData.map(groupData => groupData.name)}
                    onGroupSelect={setSelectedGroup}
                />
                <div className="flex flex-1">
                    <DetailsPane selectedImage={selectedImage} />
                    <main className="flex-1 overflow-auto p-6">
                        <ImageGallery
                            groupData={groupsData.find(groupData => groupData.name === selectedGroup)}
                            selectedImage={selectedImage}
                            onImageSelect={setSelectedImage}
                        />
                    </main>
                </div>
            </SidebarProvider>
        </div>
    );
}
