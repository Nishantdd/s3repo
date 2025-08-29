'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, FileText, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { guidesData } from '@/data/guidesData';

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [expandedSection, setExpandedSection] = useState<string>('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const pathSlugs = pathname.split('/');
        setExpandedSection(prev => {
            if (!pathname || pathname.length < 3) return prev;
            return pathSlugs[2];
        });
        setMobileMenuOpen(false);
    }, [pathname]);

    const handleToggle = (slug: string) => {
        setExpandedSection(prev => (prev === slug ? '' : slug));
    };

    const isActiveGuide = (categorySlug: string, guideSlug: string) => {
        return pathname === `/guides/${categorySlug}/${guideSlug}`;
    };

    return (
        <div className="bg-background">
            <header className="border-border bg-card/80 border-b backdrop-blur-sm md:hidden">
                <div className="flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-1">
                        <Image
                            src="/s3repo.svg"
                            className="dark:invert"
                            width={24}
                            height={24}
                            draggable="false"
                            alt="Logo"
                        />
                        <span className="font-medium">S3Repo</span>
                    </div>

                    <button
                        aria-label="Toggle menu"
                        onClick={() => setMobileMenuOpen(v => !v)}
                        className="hover:bg-accent/50 rounded-md p-2">
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                <div
                    className={cn(
                        'overflow-hidden px-2 transition-[max-height] duration-200',
                        mobileMenuOpen ? 'max-h-[1000px] pb-3' : 'max-h-0'
                    )}>
                    <nav className="space-y-2">
                        {guidesData.map(section => (
                            <div key={`mobile-${section.slug}`} className="space-y-1">
                                <button
                                    onClick={() => handleToggle(section.slug)}
                                    className="hover:bg-accent flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium">
                                    <span>{section.title}</span>
                                    <ChevronDown
                                        className={`h-4 w-4 transition-transform ${
                                            expandedSection !== section.slug ? '-rotate-90' : 'rotate-0'
                                        }`}
                                    />
                                </button>

                                {expandedSection === section.slug && (
                                    <div className="ml-4 space-y-1">
                                        {section.items.map(item => (
                                            <Link
                                                key={`mobile-${section.slug}-${item.slug}`}
                                                href={`/guides/${section.slug}/${item.slug}`}
                                                className={cn(
                                                    'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                                                    isActiveGuide(section.slug, item.slug)
                                                        ? 'text-foreground font-medium'
                                                        : 'text-muted-foreground hover:text-foreground'
                                                )}
                                                onClick={() => setMobileMenuOpen(false)}>
                                                <FileText className="h-3 w-3" />
                                                {item.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            </header>

            <div className="flex h-screen">
                <aside className="border-border bg-card/50 hidden w-80 flex-col border-r md:flex">
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
                                        onClick={() => handleToggle(section.slug)}
                                        className="hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all">
                                        <span>{section.title}</span>
                                        <ChevronDown
                                            className={`h-4 w-4 transition-all ${
                                                expandedSection !== section.slug && '-rotate-90'
                                            }`}
                                        />
                                    </button>

                                    {expandedSection === section.slug && (
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
