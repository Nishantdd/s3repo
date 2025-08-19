import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="animate-scale-in max-w-lg space-y-6 border-none pt-8 pb-0 shadow-none backdrop-blur-sm md:border md:shadow-xl">
                <div className="space-y-4 px-8 text-center">
                    <div className="animate-scale-in flex items-center justify-center gap-2">
                        <Image
                            src="/s3repo.svg"
                            className="animate-rotate-clockwise dark:invert"
                            width={32}
                            height={32}
                            draggable="false"
                            alt="Logo"
                        />
                        <span className="text-foreground text-2xl font-bold">S3Repo</span>
                    </div>

                    <h1 className="text-foreground text-3xl leading-tight font-bold">
                        A frontend for your S3 bucket images.
                    </h1>

                    <p className="text-muted-foreground leading-relaxed">
                        S3Repo is your frontend for dealing with images on your AWS S3 bucket. Create a bucket once,
                        provide us the credentials and you can view, download and delete any of your images on your
                        bucket.
                    </p>
                </div>

                <form method="GET" action="/signup" className="flex gap-3 px-8">
                    <Input type="email" name="email" required placeholder="Your email address" className="flex-1" />
                    <Button type="submit">
                        Let&apos;s Go
                        <ArrowUpRight />
                    </Button>
                </form>

                <div className="md:bg-muted flex w-full items-center justify-between px-8 py-4">
                    <div className="text-muted-foreground text-xs">
                        <a href="/dashboard" className="text-muted-foreground hover:text-foreground hover:underline">
                            Dashboard
                        </a>
                        <span className="text-muted-foreground/40 px-2 font-bold">/</span>
                        <a href="guides" className="text-muted-foreground hover:text-foreground hover:underline">
                            Guides
                        </a>
                    </div>

                    <div className="flex text-xs">
                        <button className="text-muted-foreground hover:text-foreground hover:cursor-pointer">
                            Dark
                        </button>
                        <span className="text-muted-foreground/40 px-2 font-bold">/</span>
                        <button className="text-muted-foreground hover:text-foreground hover:cursor-pointer">
                            System
                        </button>
                        <span className="text-muted-foreground/40 px-2 font-bold">/</span>
                        <button className="text-foreground hover:text-foreground font-semibold hover:cursor-pointer">
                            Light
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
