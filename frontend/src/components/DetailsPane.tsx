import { Share2, Trash2, Download, Edit, Calendar, HardDrive } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import ImageData from '@/types/imageData';

interface DetailsPaneProps {
    selectedImage: ImageData | undefined;
}

export function DetailsPane({ selectedImage }: DetailsPaneProps) {
    if (!selectedImage)
        return <p className="text-muted-foreground text-center text-xs">Select an image to view details</p>;

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
                                    <span>{selectedImage.created}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="text-muted-foreground h-4 w-4" />
                                    <span className="text-muted-foreground">Updated:</span>
                                    <span>{selectedImage.updated}</span>
                                </div>
                            </div>
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Actions</SidebarGroupLabel>
                    <SidebarGroupContent className="p-4">
                        <div className="grid gap-2">
                            <Button variant="outline" size="sm" className="justify-start bg-transparent">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                            </Button>
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

            <SidebarFooter className="p-4">
                <p className="text-muted-foreground text-center text-xs">Select an image to view details</p>
            </SidebarFooter>
        </Sidebar>
    );
}
