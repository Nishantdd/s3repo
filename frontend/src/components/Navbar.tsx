import { Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Image from 'next/image';
import { GroupSelector } from './GroupSelector';
import { Dispatch, SetStateAction } from 'react';
import GroupData from '@/types/groupData';

interface NavbarProps {
    groups: string[];
    selectedGroup: GroupData | undefined;
    onGroupSelect: (groupIndex: number) => void;
    setIsAccountOpen: Dispatch<SetStateAction<boolean>>;
    setIsUploaderOpen: Dispatch<SetStateAction<boolean>>;
}

export function Navbar({ setIsAccountOpen, setIsUploaderOpen, groups, selectedGroup, onGroupSelect }: NavbarProps) {
    return (
        <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b grayscale backdrop-blur">
            <div className="flex h-14 items-center justify-between px-4">
                <div className="hidden items-center justify-center gap-1 md:flex">
                    <Image
                        src="/s3repo.svg"
                        className="dark:invert"
                        width={32}
                        height={32}
                        draggable="false"
                        alt="Logo"
                    />
                    <h1 className="text-lg font-semibold">S3Repo</h1>
                </div>

                <GroupSelector selectedGroup={selectedGroup} groups={groups} onGroupSelect={onGroupSelect} />

                <div className="flex items-center space-x-2">
                    <SidebarTrigger />
                    <Button
                        onClick={() => setIsUploaderOpen(prev => !prev)}
                        variant="ghost"
                        size="icon"
                        className="duration-75 active:scale-90">
                        <Plus className="h-5 w-5" />
                    </Button>
                    <Button
                        onClick={() => setIsAccountOpen(prev => !prev)}
                        variant="ghost"
                        size="icon"
                        className="duration-75 active:scale-90">
                        <User className="h-5 w-5" />
                        <span className="sr-only">User profile</span>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
