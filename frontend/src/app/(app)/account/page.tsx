'use client';

import { authClient } from '@/lib/auth-client';
import { Loading } from '@/components/Loading';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Page() {
    const { data: session, isPending, error } = authClient.useSession();

    if (isPending) return <Loading />;
    if (!session || error) return redirect('/login');

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    redirect('/login');
                }
            }
        });
    };

    return <Button onClick={handleLogout}>Logout</Button>;
}
