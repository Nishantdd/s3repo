'use client';

import { Suspense, useEffect, useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DetailsPane } from '@/components/DetailsPane';
import { Navbar } from '@/components/Navbar';
import { ImageGallery } from '@/components/ImageGallery';
import GroupData from '@/types/groupData';
import { authClient } from '@/lib/auth-client';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { Loading } from '@/components/Loading';
import Account from '@/components/Account';
import S3Credentials from '@/types/s3Credentials';
import ImageData from '@/types/imageData';
import { Uploader } from '@/components/Uploader';
import { toast } from 'sonner';
import { ViewMode } from '@/types/viewMode';

function DashboardContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const updateQueryParams = (key: string, value?: string) => {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.replace(`?${params.toString()}`);
    };

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
    const [isUploaderOpen, setIsUploaderOpen] = useState<boolean>(searchParams?.get('uploader') === 'open');
    const [groupsData, setGroupsData] = useState<GroupData[]>([]);
    const [selectedImage, setSelectedImage] = useState<ImageData | undefined>();
    const [selectedGroup, setSelectedGroup] = useState<GroupData | undefined>();
    const [viewMode, setViewMode] = useState<ViewMode>(() => {
        const paramsView = searchParams?.get('view');
        if (paramsView === 'details' || paramsView === 'grid-small' || paramsView === 'grid-large') return paramsView;
        else return 'details';
    });
    const [s3Credentials, setS3Credentials] = useState<S3Credentials>({
        accessKey: '',
        bucketName: '',
        bucketRegion: '',
        secretAccessKey: ''
    });

    const handleGroupSelect = (groupIndex: number) => {
        const group = groupsData[groupIndex];
        setSelectedGroup(group);
        updateQueryParams('group', group.name);
    };

    const handleViewSelect = (view: ViewMode) => {
        setViewMode(view);
        updateQueryParams('view', view);
    };

    useEffect(() => {
        const fetchS3Credentials = async () => {
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/get-s3-credentials`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                cache: 'force-cache',
                next: { revalidate: 600 }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        toast.error(res.error);
                        return;
                    }

                    setS3Credentials(res.data);
                })
                .catch(err => console.error(err.message));
        };

        const getGroupsList = async () => {
            setIsLoading(true);
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/images`, {
                method: 'GET',
                credentials: 'include'
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        toast.error(res.error);
                        return;
                    }

                    const groupsData: GroupData[] | undefined = res.data;
                    setGroupsData(groupsData || []);
                    const groupName = searchParams?.get('group');
                    const group: GroupData | undefined = groupName
                        ? groupsData?.find(group => group?.name === groupName)
                        : undefined;
                    setSelectedGroup(group);
                })
                .catch(err => console.error(err.message))
                .finally(() => setIsLoading(false));
        };

        getGroupsList();
        fetchS3Credentials();
    }, []);

    const { data: session, isPending, error } = authClient.useSession();
    if (isPending || isLoading) return <Loading />;
    if (!session || error) return redirect('/login');

    return (
        <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider
                defaultOpen={false}
                className="flex flex-col"
                style={
                    {
                        '--sidebar-width': '20rem',
                        '--sidebar-width-mobile': '18rem'
                    } as React.CSSProperties
                }>
                <Navbar
                    setIsAccountOpen={setIsAccountOpen}
                    setIsUploaderOpen={setIsUploaderOpen}
                    groups={groupsData.map(groupData => groupData.name)}
                    selectedGroup={selectedGroup}
                    onGroupSelect={(groupIndex: number) => {
                        handleGroupSelect(groupIndex);
                    }}
                />
                <Account
                    isAccountOpen={isAccountOpen}
                    setIsAccountOpen={setIsAccountOpen}
                    s3Credentials={s3Credentials}
                />
                <Uploader
                    isUploaderOpen={isUploaderOpen}
                    setIsUploaderOpen={setIsUploaderOpen}
                    selectedGroup={selectedGroup}
                    setGroupsData={setGroupsData}
                />
                {selectedGroup ? (
                    <div className="flex flex-1">
                        <DetailsPane
                            selectedGroup={selectedGroup}
                            selectedImage={selectedImage}
                            setGroupsData={setGroupsData}
                            setSelectedImage={setSelectedImage}
                        />
                        <main className="flex-1 overflow-auto p-6">
                            <ImageGallery
                                viewMode={viewMode}
                                setViewMode={handleViewSelect}
                                selectedGroup={selectedGroup}
                                selectedImage={selectedImage}
                                onImageSelect={(image: ImageData) =>
                                    setSelectedImage(image === selectedImage ? undefined : image)
                                }
                            />
                        </main>
                    </div>
                ) : (
                    <div className="flex flex-1 items-center justify-center">Please select a group</div>
                )}
            </SidebarProvider>
        </div>
    );
}

export default function Dashboard() {
    return (
        <Suspense fallback={<Loading />}>
            <DashboardContent />
        </Suspense>
    );
}
