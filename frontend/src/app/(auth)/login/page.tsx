'use client';

import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { redirect, useRouter } from 'next/navigation';

function LoginContent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignUpRedirect = () => router.push('/signup');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await authClient.signIn.email(
            {
                email: email,
                password: password,
                callbackURL: '/dashboard',
                rememberMe: true
            },
            {
                onRequest: () => {
                    setLoading(true);
                },
                onError: ctx => {
                    setLoading(false);
                    toast.error(ctx.error.message);
                }
            }
        );
    };

    const handleGoogleLogin = () => {
        toast.info('Google login is not implemented yet.');
    };

    return (
        <div className="bg-background flex min-h-screen items-center justify-center px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login to your account</CardTitle>
                    <CardDescription>Enter your email below to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Your password"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader className="animate-spin-slow h-4 w-4" /> Signing you in
                                        </>
                                    ) : (
                                        'Login'
                                    )}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    disabled={loading}>
                                    Login with Google
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-center gap-x-2 text-sm">
                            Don&apos;t have an account?
                            <Button
                                type="button"
                                variant="link"
                                onClick={handleSignUpRedirect}
                                className="p-0 font-semibold underline">
                                Sign up
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default function Login() {
    const { data: session, isPending, error } = authClient.useSession();
    if (isPending) return;
    if (session && !error) return redirect('/dashboard');
    return <LoginContent />;
}
