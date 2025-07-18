'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageData {
    id: number;
    src: string;
    name: string;
    size: string;
    created: string;
    updated: string;
}

interface ImageGalleryProps {
    images: ImageData[];
    selectedImage: ImageData;
    onImageSelect: (image: ImageData) => void;
}

export function ImageGallery({ images, selectedImage, onImageSelect }: ImageGalleryProps) {
    return (
        <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {images.map((image, index) => (
                <div
                    key={image.id}
                    className={cn(
                        'relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all hover:shadow-lg',
                        selectedImage.id === image.id
                            ? 'border-primary ring-primary/20 ring-2'
                            : 'border-border hover:border-primary/50',
                        index % 7 === 0 ? 'col-span-2 row-span-1' : '',
                        index % 5 === 0 && index % 7 !== 0 ? 'row-span-2' : '',
                        index % 3 === 0 && index % 5 !== 0 && index % 7 !== 0 ? 'col-span-2' : ''
                    )}
                    onClick={() => onImageSelect(image)}>
                    <Image
                        src={image.src || '/placeholder.svg'}
                        alt={image.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors hover:bg-black/10" />
                    {selectedImage.id === image.id && (
                        <div className="bg-primary absolute top-2 right-2 h-3 w-3 rounded-full" />
                    )}
                </div>
            ))}
        </div>
    );
}
