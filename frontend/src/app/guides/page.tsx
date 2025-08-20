import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { featuredGuides } from '@/data/featuredGuides';

export default function GuidesHomePage() {
    return (
        <div className="mx-auto max-w-4xl p-8">
            <div className="mb-12">
                <h2 className="mb-6 text-2xl font-semibold">Featured Guides</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {featuredGuides.map(guide => (
                        <Card key={guide.href} className="group transition-shadow hover:shadow-md">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 rounded-lg p-2">
                                        <guide.icon className="text-primary h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                                            {guide.category}
                                        </div>
                                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="mb-4">{guide.description}</CardDescription>
                                <Link href={guide.href}>
                                    <Button variant="ghost" className="bg-accent hover:bg-primary/10 h-6 p-0">
                                        Read Guide
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="bg-secondary rounded-lg p-8">
                <h2 className="mb-4 text-2xl font-semibold">Getting Started</h2>
                <p className="text-muted-foreground mb-6">
                    If you want to just learn how to setup credentials for S3Repo and not go through AWS Tutorials, you
                    can read the account setup.
                </p>
                <Link href="/guides/getting-started/account-setup">
                    <Button>
                        Setup Credentials
                        <ArrowUpRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
