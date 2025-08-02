'use client';

import { Share2, Trash2, Download, Calendar, HardDrive, Layers } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import GroupData from '@/types/groupData';
import ImageData from '@/types/imageData';
import { Dispatch, SetStateAction, useState } from 'react';

interface DetailsPaneProps {
    selectedImage: ImageData | undefined;
    selectedGroup: GroupData;
    setSelectedImage: Dispatch<SetStateAction<ImageData | undefined>>;
    setGroupsData: Dispatch<SetStateAction<GroupData[]>>;
}

const parseSizeInBytes = (sizeStr: string): number => {
    const parts = sizeStr.split(' ');
    if (parts.length !== 2) return 0;

    const value = parseFloat(parts[0]);
    const unit = parts[1].toUpperCase();

    switch (unit) {
        case 'GB':
            return value * 1024 * 1024 * 1024;
        case 'MB':
            return value * 1024 * 1024;
        case 'KB':
            return value * 1024;
        case 'B':
            return value;
        default:
            return 0;
    }
};

const formatBytes = (bytes: number, decimals = 2): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

function formatDate(isoString: string, locale: string | undefined = undefined): string {
    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return new Intl.DateTimeFormat(locale, options).format(date);
}

export function DetailsPane({ selectedImage, selectedGroup, setSelectedImage, setGroupsData }: DetailsPaneProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    if (selectedImage) {
        const handleShare = async () => {
            try {
                const clipText = await navigator.clipboard.readText();
                if (clipText === selectedImage.src) return;
                await navigator.clipboard.writeText(selectedImage.src);
            } catch (err) {
                console.error('error occured: ', err);
                await navigator.clipboard.writeText(selectedImage.src);
            }
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
                .then(() => {
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
                        <SidebarGroupContent className="space-y-4 p-4 pt-2">
                            <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
                                <Image
                                    src={selectedImage.src || '/placeholder.svg'}
                                    alt={selectedImage.name}
                                    fill
                                    className="object-cover"
                                    draggable="false"
                                />
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <h3 className="text-muted-foreground text-sm font-medium">Filename</h3>
                                    <p className="font-mono text-sm break-all">{selectedImage.name}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <HardDrive className="text-muted-foreground h-4 w-4" />
                                    <Badge variant="secondary">{selectedImage.size}</Badge>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="text-muted-foreground h-4 w-4" />
                                        <span className="text-muted-foreground">Created:</span>
                                        <span>{formatDate(selectedImage.created)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="text-muted-foreground h-4 w-4" />
                                        <span className="text-muted-foreground">Updated:</span>
                                        <span>{formatDate(selectedImage.updated)}</span>
                                    </div>
                                </div>
                            </div>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup>
                        <SidebarGroupLabel>Actions</SidebarGroupLabel>
                        <SidebarGroupContent className="p-4">
                            <div className="grid gap-2">
                                <a
                                    href={selectedImage.src}
                                    download={selectedImage.name}
                                    rel="noreferrer"
                                    target="_blank"
                                    className="inline-block">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={isDeleting}
                                        className="w-full justify-start bg-transparent duration-75 active:scale-95">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                    </Button>
                                </a>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleShare}
                                    disabled={isDeleting}
                                    className="justify-start bg-transparent duration-75 active:scale-95">
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="justify-start duration-75 active:scale-95">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </Button>
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
