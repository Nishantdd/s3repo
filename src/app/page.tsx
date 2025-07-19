'use client';

import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DetailsPane } from '@/components/DetailsPane';
import { Navbar } from '@/components/Navbar';
import { ImageGallery } from '@/components/ImageGallery';

const sampleImages = [
    {
        id: 1,
        src: '/placeholder.svg?height=200&width=200',
        name: 'landscape-1.jpg',
        size: '2.5MB',
        created: '2024-01-15',
        updated: '2024-01-16'
    },
    {
        id: 2,
        src: '/placeholder.svg?height=300&width=200',
        name: 'portrait-1.jpg',
        size: '1.8MB',
        created: '2024-01-14',
        updated: '2024-01-14'
    },
    {
        id: 3,
        src: '/placeholder.svg?height=150&width=300',
        name: 'nature-scene.jpg',
        size: '3.2MB',
        created: '2024-01-13',
        updated: '2024-01-15'
    },
    {
        id: 4,
        src: '/placeholder.svg?height=250&width=200',
        name: 'city-view.jpg',
        size: '2.1MB',
        created: '2024-01-12',
        updated: '2024-01-12'
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
];

export default function HomePage() {
    const [selectedImage, setSelectedImage] = useState(sampleImages[0]);

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
                <Navbar />
                <div className="flex flex-1">
                    <DetailsPane selectedImage={selectedImage} />
                    <main className="flex-1 overflow-auto p-6">
                        <ImageGallery
                            images={sampleImages}
                            selectedImage={selectedImage}
                            onImageSelect={setSelectedImage}
                        />
                    </main>
                </div>
            </SidebarProvider>
        </div>
    );
}
