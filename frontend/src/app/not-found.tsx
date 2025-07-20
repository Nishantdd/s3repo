import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Card className="w-full max-w-70 border-none bg-none text-center shadow-none">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-5xl font-bold">404</CardTitle>
                    <CardDescription className="text-xl text-gray-600 dark:text-gray-400">
                        Page Not Found
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
