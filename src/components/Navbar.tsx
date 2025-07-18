import { Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Navbar() {
    return (
        <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
            <div className="flex h-14 items-center px-4">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                    <h1 className="text-lg font-semibold">Image Gallery</h1>
                </div>

                <div className="ml-auto flex items-center space-x-4">
                    <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                        <span className="sr-only">User profile</span>
                    </Button>
                    <SidebarTrigger />
                </div>
            </div>
        </nav>
    );
}
