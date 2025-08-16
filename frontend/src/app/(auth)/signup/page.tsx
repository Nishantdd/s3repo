'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleLoginRedirect = () => router.push('/login');

    const handleGoogleSignup = () => {
        toast.info('Google signup is not implemented yet.');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return;
        if (!email.includes('@')) return;

        const name = email.includes('.') ? email.split('.')[0] : email.split('@')[0];

        await authClient.signUp.email(
            {
                email: email,
                password: password,
                name: name
            },
            {
                onRequest: () => {
                    setLoading(true);
                },
                onSuccess: () => {
                    setLoading(false);
                    router.push('/dashboard');
                },
                onError: ctx => {
                    setLoading(false);
                    toast.error(ctx.error.message);
                }
            }
        );
    };

    return (
        <div className="bg-background flex min-h-screen items-center justify-center px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Create an account</CardTitle>
                    <CardDescription>Enter your email and password to sign up</CardDescription>
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
                                            <Loader className="animate-spin-slow h-4 w-4" /> Creating account
                                        </>
                                    ) : (
                                        'Sign Up'
                                    )}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    type="button"
                                    onClick={handleGoogleSignup}
                                    disabled={loading}>
                                    Sign up with Google
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-center gap-x-2 text-sm">
                            Already have an account?
                            <Button
                                type="button"
                                variant="link"
                                onClick={handleLoginRedirect}
                                className="p-0 font-semibold underline">
                                Log in
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
