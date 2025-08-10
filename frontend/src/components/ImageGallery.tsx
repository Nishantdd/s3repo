'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import ImageData from '@/types/imageData';
import GroupData from '@/types/groupData';
import { Download, LayoutList, Grid, Grid2x2 } from 'lucide-react';
import { useState } from 'react';
import { formatDate } from '@/lib/helpers';

type ViewMode = 'details' | 'grid-small' | 'grid-large';

interface ImageGalleryProps {
    selectedGroup: GroupData | undefined;
    selectedImage: ImageData | undefined;
    onImageSelect: (image: ImageData) => void;
}

export function ImageGallery({ selectedGroup, selectedImage, onImageSelect }: ImageGalleryProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('grid-large');

    if (!selectedGroup || selectedGroup.images.length === 0) {
        return (
            <div className="text-muted-foreground flex h-full w-full items-center justify-center p-8">
                No images to display.
            </div>
        );
    }

    const containerClass = cn({
        'grid gap-4': viewMode === 'grid-large',
        'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6': viewMode === 'grid-large',
        'grid gap-2': viewMode === 'grid-small',
        'grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12': viewMode === 'grid-small',
        'flex flex-col gap-2': viewMode === 'details'
    });

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-end">
                <div className="bg-muted inline-flex items-center gap-1 rounded-md">
                    <button
                        onClick={() => setViewMode('details')}
                        className={cn(
                            'rounded-sm p-1.5 transition-colors',
                            viewMode === 'details'
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                        )}
                        aria-label="Details view">
                        <LayoutList className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('grid-small')}
                        className={cn(
                            'rounded-sm p-1.5 transition-colors',
                            viewMode === 'grid-small'
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                        )}
                        aria-label="Small grid view">
                        <Grid className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('grid-large')}
                        className={cn(
                            'rounded-sm p-1.5 transition-colors',
                            viewMode === 'grid-large'
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                        )}
                        aria-label="Large grid view">
                        <Grid2x2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className={containerClass}>
                {selectedGroup.images.map(image => {
                    const downloadHref = `/api/download-image?url=${encodeURIComponent(image.src)}&name=${encodeURIComponent(image.name)}`;
                    const isSelected = selectedImage?.id === image.id;

                    if (viewMode === 'details') {
                        return (
                            <div
                                key={image.id}
                                className={cn(
                                    'group relative flex cursor-pointer items-center gap-4 rounded-lg border p-2 pr-4 transition-colors',
                                    isSelected ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'
                                )}
                                onClick={() => onImageSelect(image)}>
                                <div className="pointer-events-none absolute left-4 z-10 scale-90 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                                    <div className="relative h-28 w-28 overflow-hidden rounded-md border bg-white shadow-2xl">
                                        <Image
                                            src={image.src || '/placeholder.svg'}
                                            alt={`Preview of ${image.name}`}
                                            fill
                                            className="object-cover"
                                            sizes="112px"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 truncate font-medium">{image.name}</div>
                                <div className="text-muted-foreground hidden w-24 flex-shrink-0 text-sm md:block">
                                    {image.size || 0}
                                </div>
                                <div className="text-muted-foreground hidden w-48 flex-shrink-0 text-sm lg:block">
                                    Created: {formatDate(image.created)}
                                </div>
                                <div className="text-muted-foreground hidden w-48 flex-shrink-0 text-sm xl:block">
                                    Updated: {formatDate(image.updated)}
                                </div>

                                <a
                                    href={downloadHref}
                                    onClick={e => e.stopPropagation()}
                                    className="text-muted-foreground hover:bg-muted hover:text-foreground ml-auto flex-shrink-0 rounded-md p-2"
                                    aria-label={`Download ${image.name}`}>
                                    <Download className="h-4 w-4" />
                                </a>
                            </div>
                        );
                    }

                    return (
                        <div
                            key={image.id}
                            className={cn(
                                'group relative aspect-square cursor-pointer overflow-hidden rounded-lg border-2 transition-all',
                                isSelected ? 'border-primary shadow-2xl' : 'border-border hover:border-primary/50'
                            )}
                            onClick={() => onImageSelect(image)}>
                            <Image
                                src={image.src || '/placeholder.svg'}
                                alt={image.name}
                                fill
                                className={cn(
                                    'object-cover transition-transform duration-300',
                                    isSelected ? 'scale-[1.08]' : ''
                                )}
                                sizes={
                                    viewMode === 'grid-large'
                                        ? '(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw'
                                        : '(max-width: 640px) 25vw, (max-width: 768px) 16vw, (max-width: 1024px) 12vw, (max-width: 1280px) 10vw, 8vw'
                                }
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />

                            {isSelected && (
                                <div className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-white/60 px-2 py-1 text-[10px] font-medium text-black backdrop-blur-2xl">
                                    Selected
                                </div>
                            )}

                            <a
                                href={downloadHref}
                                onClick={e => e.stopPropagation()}
                                className={cn(
                                    'absolute top-2 right-2 inline-flex items-center justify-center rounded-md bg-white/60 p-1 text-black backdrop-blur-2xl',
                                    'translate-x-2 -translate-y-2 scale-75 opacity-0',
                                    'transition-all duration-200 ease-out',
                                    'group-hover:translate-x-0 group-hover:-translate-y-0 group-hover:scale-100 group-hover:opacity-100',
                                    'hover:bg-white/30 active:scale-95'
                                )}
                                aria-label={`Download ${image.name}`}>
                                <Download className="h-4 w-4" />
                            </a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
