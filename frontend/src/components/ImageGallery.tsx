'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import ImageData from '@/types/imageData';
import GroupData from '@/types/groupData';
import { Download } from 'lucide-react';

interface ImageGalleryProps {
    selectedGroup: GroupData | undefined;
    selectedImage: ImageData | undefined;
    onImageSelect: (image: ImageData) => void;
}

export function ImageGallery({ selectedGroup, selectedImage, onImageSelect }: ImageGalleryProps) {
    if (!selectedGroup || selectedGroup.images.length === 0) {
        return (
            <div className="text-muted-foreground flex h-full w-full items-center justify-center p-8">
                No images to display.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {selectedGroup.images.map(image => {
                const downloadHref = `/api/download-image?url=${encodeURIComponent(image.src)}&name=${encodeURIComponent(image.name)}`;

                return (
                    <div
                        key={image.id}
                        className={cn(
                            'group relative aspect-square cursor-pointer overflow-hidden rounded-lg border-2 transition-all hover:shadow-lg',
                            selectedImage?.id === image.id
                                ? 'border-primary ring-primary/20 ring-2'
                                : 'border-border hover:border-primary/50'
                        )}
                        onClick={() => onImageSelect(image)}>
                        <Image
                            src={image.src || '/placeholder.svg'}
                            alt={image.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />

                        {selectedImage?.id === image.id && (
                            <div className="bg-primary absolute top-2 right-2 h-3 w-3 rounded-full" />
                        )}

                        <a
                            href={downloadHref}
                            onClick={e => {
                                // Prevent selecting the image when clicking the download button
                                e.stopPropagation();
                            }}
                            className={cn(
                                'absolute top-2 right-2 inline-flex items-center justify-center rounded-md bg-white/60 p-1 text-white backdrop-blur-2xl',
                                'translate-x-2 -translate-y-2 scale-75 opacity-0',
                                'transition-all duration-200 ease-out',
                                'group-hover:translate-x-0 group-hover:-translate-y-0 group-hover:scale-100 group-hover:opacity-100',
                                'hover:bg-white/30 active:scale-95'
                            )}
                            aria-label={`Download ${image.name}`}>
                            <Download className="h-4 w-4" color="black" />
                        </a>
                    </div>
                );
            })}
        </div>
    );
}
