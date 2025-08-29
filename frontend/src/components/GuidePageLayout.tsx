'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TableOfContentsItem } from '@/types/tableOfContents';
import { Progress } from './ui/progress';

interface GuidePageLayoutProps {
    title: string;
    description: string;
    estimatedTime: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    tableOfContents: TableOfContentsItem[];
    children: React.ReactNode;
    previousGuide?: { title: string; href: string };
    nextGuide?: { title: string; href: string };
}

export default function GuidePageLayout({
    title,
    description,
    estimatedTime,
    difficulty,
    tableOfContents,
    children,
    previousGuide,
    nextGuide
}: GuidePageLayoutProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [readSections, setReadSections] = useState<Set<string>>(new Set());
    const [readingProgress, setReadingProgress] = useState<number>(0);

    useEffect(() => {
        const mainContent = scrollContainerRef.current;
        if (!mainContent || tableOfContents.length === 0) return;

        const sectionElements = tableOfContents
            .map(item => document.getElementById(item.id))
            .filter(Boolean) as HTMLElement[];

        const handleScroll = () => {
            const { scrollTop } = mainContent;
            let activeIndex = 0;
            const newReadSections = new Set<string>();

            for (const section of sectionElements) {
                if (section.offsetTop <= scrollTop + 550) {
                    activeIndex++;
                    newReadSections.add(section.id);
                } else {
                    break;
                }
            }

            setReadSections(newReadSections);
            const progress = (activeIndex / tableOfContents.length) * 100;
            setReadingProgress(progress);
        };

        mainContent.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => mainContent.removeEventListener('scroll', handleScroll);
    }, [tableOfContents]);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const getDifficultyColor = (level: string) => {
        switch (level) {
            case 'Beginner':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'Intermediate':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'Advanced':
                return 'text-red-600 bg-red-50 border-red-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    return (
        <div className="flex h-screen">
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-4xl">
                    <article className="px-8 py-12">
                        <header className="mb-12">
                            <h1 className="mb-4 text-4xl font-bold">{title}</h1>
                            <p className="text-muted-foreground mb-6 text-xl">{description}</p>

                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <Clock className="text-muted-foreground h-4 w-4" />
                                    <span>{estimatedTime}</span>
                                </div>
                                <div
                                    className={cn(
                                        'rounded-full border px-3 py-1 text-xs font-medium',
                                        getDifficultyColor(difficulty)
                                    )}>
                                    {difficulty}
                                </div>
                            </div>
                        </header>

                        <div className="prose prose-gray dark:prose-invert max-w-none">{children}</div>

                        <nav className="border-border mt-16 border-t pt-8">
                            <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between">
                                {previousGuide ? (
                                    <Link href={previousGuide.href} className="block w-full md:w-auto">
                                        <Button
                                            variant="outline"
                                            className="flex w-full items-center justify-start gap-2 md:w-auto">
                                            <ArrowLeft className="h-4 w-4" />
                                            <div className="text-left">
                                                <div className="font-medium">{previousGuide.title}</div>
                                            </div>
                                        </Button>
                                    </Link>
                                ) : (
                                    <div className="w-full md:w-auto" />
                                )}

                                {nextGuide && (
                                    <Link href={nextGuide.href} className="block w-full md:w-auto">
                                        <Button className="flex w-full items-center justify-end gap-2 md:w-auto">
                                            <div className="text-right">
                                                <div className="font-medium">{nextGuide.title}</div>
                                            </div>
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </nav>
                    </article>
                </div>
            </div>

            {tableOfContents.length > 0 && (
                <aside className="border-border hidden h-screen w-72 flex-col border-l py-12 lg:flex">
                    <div className="overflow-y-auto px-6">
                        <div className="mb-8">
                            <div className="mb-2 flex items-center justify-between">
                                <h3 className="text-sm font-semibold">Reading Progress</h3>
                                <span className="text-muted-foreground text-xs">{Math.round(readingProgress)}%</span>
                            </div>
                            <Progress value={readingProgress} className="h-2" />
                        </div>
                        <h3 className="text-foreground mb-4 text-sm font-semibold">On this page</h3>
                        <nav className="flex flex-col">
                            {tableOfContents.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={cn(
                                        'w-full border-l-2 py-1.5 text-left text-sm transition-colors',
                                        item.level > 1 ? 'pl-10' : 'pl-3',
                                        readSections.has(item.id)
                                            ? 'border-primary text-primary'
                                            : 'text-muted-foreground hover:text-foreground border-transparent'
                                    )}>
                                    {item.title}
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>
            )}
        </div>
    );
}
