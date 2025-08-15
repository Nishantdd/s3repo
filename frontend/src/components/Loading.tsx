import { Loader2 } from 'lucide-react';

export function Loading() {
    return (
        <div className="flex h-screen w-screen items-center justify-center gap-2">
            <Loader2 height={24} width={24} className="animate-spin-slow" />
            Getting your details
        </div>
    );
}
