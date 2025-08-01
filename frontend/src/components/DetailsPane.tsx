import { Share2, Trash2, Download, Edit, Calendar, HardDrive, Layers } from 'lucide-react';
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

interface DetailsPaneProps {
    selectedImage: ImageData | undefined;
    selectedGroup: GroupData;
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

export function DetailsPane({ selectedImage, selectedGroup }: DetailsPaneProps) {
    if (selectedImage) {
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
                                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                    </Button>
                                </a>
                                <Button variant="outline" size="sm" className="justify-start bg-transparent">
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share
                                </Button>
                                <Button variant="outline" size="sm" className="justify-start bg-transparent">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>
                                <Separator className="my-2" />
                                <Button variant="destructive" size="sm" className="justify-start">
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
                            <Separator className="mt-16 mb-4 w-full pt-2" />
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
