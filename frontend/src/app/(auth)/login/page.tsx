'use client';

import type React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, Loader } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

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

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Card className="w-full max-w-70 border-none bg-none shadow-none">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-center text-2xl font-bold">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col items-end space-y-4">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="w-full"
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full"
                        />
                        <Button type="submit" className="mt-2 flex items-center justify-center">
                            {loading ? <Loader className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
