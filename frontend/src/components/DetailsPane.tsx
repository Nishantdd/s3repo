'use client';

import { Share2, Trash2, Download, Layers, Loader } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import GroupData from '@/types/groupData';
import ImageData from '@/types/imageData';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { formatBytes, formatDate, getFileType, parseSizeInBytes } from '@/lib/helpers';
import { toast } from 'sonner';

interface DetailsPaneProps {
    selectedImage: ImageData | undefined;
    selectedGroup: GroupData;
    setSelectedImage: Dispatch<SetStateAction<ImageData | undefined>>;
    setGroupsData: Dispatch<SetStateAction<GroupData[]>>;
}

export function DetailsPane({ selectedImage, selectedGroup, setSelectedImage, setGroupsData }: DetailsPaneProps) {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => setIsImageLoading(true), [selectedImage]);

    if (selectedImage) {
        const handleShare = async () => {
            await navigator.clipboard.writeText(selectedImage.src);
            toast.info('URL copied to clipboard');
        };

        const handleDelete = async () => {
            setIsDeleting(true);
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/image`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    groupName: selectedGroup.name,
                    imageName: selectedImage.name
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        toast.error(res.error);
                        return;
                    }

                    setGroupsData(groups => {
                        groups.forEach(group => {
                            group.images = group.images.filter(image => image.id !== selectedImage?.id);
                        });
                        return groups;
                    });

                    setSelectedImage(undefined);
                })
                .catch(err => console.error(err.message))
                .finally(() => setIsDeleting(false));
        };

        return (
            <Sidebar side="left" className="top-(--header-height) h-[calc(100svh-var(--header-height))]!">
                <SidebarHeader className="p-4 pb-0">
                    <h2 className="text-lg font-semibold">Image Details</h2>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent className="mt-4 space-y-4 px-4">
                            <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
                                {isImageLoading && (
                                    <div className="bg-secondary absolute inset-0 z-10 flex items-center justify-center">
                                        <Loader className="h-6 w-6 animate-spin" />
                                    </div>
                                )}
                                <Image
                                    src={selectedImage.src || '/placeholder.svg'}
                                    alt={selectedImage.name}
                                    fill
                                    onLoad={() => setIsImageLoading(false)}
                                    onError={() => setIsImageLoading(false)}
                                    className={`object-cover transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                                    draggable="false"
                                />
                            </div>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup>
                        <SidebarGroupContent className="space-y-4 px-4 pt-2">
                            <div className="space-y-3">
                                <Badge variant="secondary" className="flex w-full flex-col items-start">
                                    <div className="text-muted-foreground text-sm font-medium">Filename</div>
                                    <p className="font-mono text-sm break-all">{selectedImage.name}</p>
                                </Badge>

                                <Badge variant="secondary" className="flex w-full flex-col items-start">
                                    <div className="text-muted-foreground text-sm font-medium">Type</div>
                                    <p className="font-mono text-sm break-all">{getFileType(selectedImage.name)}</p>
                                </Badge>

                                <Badge variant="secondary" className="flex w-full flex-col items-start">
                                    <div className="text-muted-foreground text-sm font-medium">Size</div>
                                    <p className="font-mono text-sm break-all">{selectedImage.size}</p>
                                </Badge>

                                <Badge variant="secondary" className="flex w-full flex-col items-start">
                                    <div className="text-muted-foreground text-sm font-medium">Created</div>
                                    <p className="font-mono text-sm break-all">{formatDate(selectedImage.created)}</p>
                                    <div className="text-muted-foreground text-sm font-medium">Updated</div>
                                    <p className="font-mono text-sm break-all">{formatDate(selectedImage.updated)}</p>
                                </Badge>

                                <Badge
                                    variant="outline"
                                    className="mt-8 flex w-full items-start justify-evenly shadow-inner">
                                    <a
                                        href={`/api/download-image?url=${encodeURIComponent(selectedImage.src)}&name=${encodeURIComponent(selectedImage.name)}`}
                                        className="inline-block">
                                        <Button
                                            variant="link"
                                            size="icon"
                                            disabled={isDeleting}
                                            className="duration-75 active:scale-90">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </a>
                                    <Button
                                        variant="link"
                                        size="icon"
                                        onClick={handleShare}
                                        disabled={isDeleting}
                                        className="duration-75 active:scale-90">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="link"
                                        size="sm"
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                        className="duration-75 active:scale-90">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </Badge>
                            </div>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        );
    } else {
        const imageCount = selectedGroup.images.length;
        const totalSize = formatBytes(selectedGroup.images.reduce((sum, img) => sum + parseSizeInBytes(img.size), 0));

        const extensionCounts = selectedGroup.images.reduce(
            (acc, image) => {
                const extension = image.name.split('.').pop()?.toUpperCase() || 'N/A';
                acc[extension] = (acc[extension] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>
        );

        return (
            <Sidebar side="left" className="top-(--header-height) h-[calc(100svh-var(--header-height))]!">
                <SidebarHeader className="p-4">
                    <h2 className="text-lg font-semibold">Group Details</h2>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent className="flex flex-col items-center space-y-4 p-4 pt-16 text-center">
                            <Layers className="text-muted-foreground h-16 w-16" />
                            <div className="space-y-1">
                                <p className="text-lg font-semibold">{selectedGroup.name}</p>
                                <p className="text-muted-foreground text-sm">
                                    {imageCount} {imageCount === 1 ? 'item' : 'items'} • {totalSize}
                                </p>
                            </div>
                            <Separator className="mt-16 mb-4 w-full rounded-xl pt-2" />
                            <div className="w-full space-y-2 text-left">
                                <h3 className="text-sm font-medium">File Types</h3>
                                {Object.entries(extensionCounts).map(([ext, count]) => (
                                    <div key={ext} className="flex items-center justify-between text-sm">
                                        <p className="text-muted-foreground font-mono">{ext}</p>
                                        <p className="font-medium">{count}</p>
                                    </div>
                                ))}
                            </div>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        );
    }
}
