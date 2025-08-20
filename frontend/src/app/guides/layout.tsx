'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { guidesData } from '@/data/guidesData';

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
    const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started']);
    const pathname = usePathname();

    const toggleSection = (slug: string) => {
        setExpandedSections(prev => (prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]));
    };

    const isActiveGuide = (categorySlug: string, guideSlug: string) => {
        return pathname === `/guides/${categorySlug}/${guideSlug}`;
    };

    return (
        <div className="bg-background">
            <div className="flex h-screen">
                <aside className="border-border bg-card/50 flex w-80 flex-col border-r">
                    <Link href="/guides" className="border-border border-b p-6">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/s3repo.svg"
                                className="dark:invert"
                                width={32}
                                height={32}
                                draggable="false"
                                alt="Logo"
                            />
                            <h1 className="text-xl font-semibold">S3Repo Guides</h1>
                        </div>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Comprehensive AWS tutorials and documentation
                        </p>
                    </Link>

                    <nav className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-2">
                            {guidesData.map(section => (
                                <div key={section.slug} className="space-y-1">
                                    <button
                                        onClick={() => toggleSection(section.slug)}
                                        className="hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all">
                                        <span>{section.title}</span>
                                        <ChevronDown
                                            className={`h-4 w-4 transition-all ${
                                                !expandedSections.includes(section.slug) && '-rotate-90'
                                            }`}
                                        />
                                    </button>

                                    {expandedSections.includes(section.slug) && (
                                        <div className="ml-4 space-y-1">
                                            {section.items.map(item => (
                                                <Link
                                                    key={item.slug}
                                                    href={`/guides/${section.slug}/${item.slug}`}
                                                    className={cn(
                                                        'hover:bg-accent flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                                                        isActiveGuide(section.slug, item.slug)
                                                            ? 'text-foreground font-medium'
                                                            : 'text-muted-foreground hover:text-foreground'
                                                    )}>
                                                    <FileText className="h-3 w-3" />
                                                    {item.title}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </nav>
                </aside>

                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
