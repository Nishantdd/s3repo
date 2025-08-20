'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { CheckCircle, Circle, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { TableOfContentsItem } from '@/types/tableOfContents';

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
    const [activeSection, setActiveSection] = useState<string>('');
    const [readSections, setReadSections] = useState<Set<string>>(new Set());
    const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
    const [readingProgress, setReadingProgress] = useState(0);

    useEffect(() => {
        const mainContent = scrollContainerRef.current;
        if (!mainContent) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = mainContent;
            const docHeight = scrollHeight - clientHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setReadingProgress(Math.min(progress, 100));

            const sections = tableOfContents.map(item => document.getElementById(item.id)).filter(Boolean);
            let currentActiveSection = '';
            const newReadSections = new Set<string>();

            for (const section of sections) {
                const sectionTop = section?.offsetTop;
                if (sectionTop && sectionTop <= scrollTop + 150) {
                    currentActiveSection = section?.id;
                    newReadSections.add(section.id);
                } else {
                    break;
                }
            }

            setActiveSection(currentActiveSection);
            setReadSections(newReadSections);
        };

        mainContent.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => mainContent.removeEventListener('scroll', handleScroll);
    }, [tableOfContents]);

    const toggleSectionComplete = (sectionId: string) => {
        setCompletedSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sectionId)) {
                newSet.delete(sectionId);
            } else {
                newSet.add(sectionId);
            }
            return newSet;
        });
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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

                        <nav className="border-border mt-16 flex items-center justify-between border-t pt-8">
                            {previousGuide ? (
                                <Link href={previousGuide.href}>
                                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                                        <ArrowLeft className="h-4 w-4" />
                                        <div className="text-left">
                                            <div className="font-medium">{previousGuide.title}</div>
                                        </div>
                                    </Button>
                                </Link>
                            ) : (
                                <div />
                            )}

                            {nextGuide && (
                                <Link href={nextGuide.href}>
                                    <Button className="flex items-center gap-2">
                                        <div className="text-right">
                                            <div className="font-medium">{nextGuide.title}</div>
                                        </div>
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            )}
                        </nav>
                    </article>
                </div>
            </div>

            <aside className="border-border bg-card/30 hidden h-screen w-80 flex-col border-l lg:flex">
                <div className="overflow-y-auto p-6">
                    <div className="mb-8">
                        <div className="mb-2 flex items-center justify-between">
                            <h3 className="text-sm font-semibold">Reading Progress</h3>
                            <span className="text-muted-foreground text-xs">{Math.round(readingProgress)}%</span>
                        </div>
                        <Progress value={readingProgress} className="h-2" />
                    </div>

                    <div className="mb-8">
                        <h3 className="mb-4 text-sm font-semibold">Table of Contents</h3>
                        <nav className="flex flex-col gap-1">
                            {tableOfContents.map(item => (
                                <div key={item.id} className="group flex items-center gap-2">
                                    <button
                                        onClick={() => toggleSectionComplete(item.id)}
                                        className="text-muted-foreground hover:text-foreground flex-shrink-0 transition-colors">
                                        {completedSections.has(item.id) ? (
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                        ) : (
                                            <Circle className="h-4 w-4" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => scrollToSection(item.id)}
                                        className={cn(
                                            'flex-1 rounded-md border-l-2 border-transparent px-2 py-1 text-left text-sm transition-colors',
                                            item.level > 1 && 'pl-6',
                                            activeSection === item.id
                                                ? 'border-primary bg-primary/10 text-primary font-medium'
                                                : readSections.has(item.id)
                                                  ? 'text-foreground/80 hover:bg-accent'
                                                  : 'text-muted-foreground hover:bg-accent'
                                        )}>
                                        {item.title}
                                    </button>
                                </div>
                            ))}
                        </nav>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="mb-2 text-sm font-medium">Your Progress</h4>
                        <div className="text-muted-foreground text-xs">
                            {completedSections.size} of {tableOfContents.length} sections completed
                        </div>
                        <Progress
                            value={(completedSections.size / tableOfContents.length) * 100}
                            className="mt-2 h-1"
                        />
                    </div>
                </div>
            </aside>
        </div>
    );
}