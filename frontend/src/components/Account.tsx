'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RotateCcw, Edit, Save, LogOut, Loader } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import S3Credentials from '@/types/s3Credentials';
import { toast } from 'sonner';

export default function Account({
    isAccountOpen,
    setIsAccountOpen,
    s3Credentials
}: {
    isAccountOpen: boolean;
    setIsAccountOpen: Dispatch<SetStateAction<boolean>>;
    s3Credentials: S3Credentials;
}) {
    const [originalValues, setOriginalValues] = useState<S3Credentials>({ ...s3Credentials });
    const [currentValues, setCurrentValues] = useState<S3Credentials>({ ...originalValues });
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [editStates, setEditStates] = useState({
        accessKey: false,
        secretAccessKey: false,
        bucketName: false,
        bucketRegion: false
    });

    useEffect(() => {
        setOriginalValues({ ...s3Credentials });
        setCurrentValues({ ...s3Credentials });
    }, [s3Credentials]);

    const handleInputChange = (field: keyof S3Credentials, value: string) => {
        setCurrentValues(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleReset = (field: keyof S3Credentials) => {
        setCurrentValues(prev => ({
            ...prev,
            [field]: originalValues[field]
        }));
    };

    const handleSave = async (field: keyof S3Credentials) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/update-s3-credentials`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ ...currentValues })
            });

            const res = await response.json();
            if (res.error) throw new Error(res.error);
            setOriginalValues(res.data);
            toast.success('S3 credentials updated successfully');
        } catch (err) {
            toast.error(`Error saving ${field}: ${(err as Error).message}`);
        }
    };

    const handleEditToggle = (field: keyof S3Credentials) => {
        const isCurrentlyEditing = editStates[field];

        if (isCurrentlyEditing) {
            if (originalValues[field] !== currentValues[field]) {
                handleSave(field);
            }
        }

        setEditStates(prev => ({
            ...prev,
            [field]: !isCurrentlyEditing
        }));
    };

    const handleLogout = async (e: React.FormEvent) => {
        setIsLoggingOut(true);
        e.preventDefault();
        await authClient
            .signOut({
                fetchOptions: {
                    onSuccess: () => {
                        redirect('/login');
                    }
                }
            })
            .finally(() => setIsLoggingOut(false));
    };

    const renderCredentialField = (field: keyof S3Credentials, label: string, type = 'text') => {
        const isEditing = editStates[field];
        return (
            <div key={field} className="space-y-2">
                <Label htmlFor={field}>{label}</Label>
                <div className="flex items-center gap-2">
                    <Input
                        id={field}
                        type={isEditing ? type : 'password'}
                        value={currentValues[field]}
                        onChange={e => handleInputChange(field, e.target.value)}
                        disabled={!isEditing}
                        className="flex-1 font-mono"
                        autoComplete="off"
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleReset(field)}
                        title="Reset to original value"
                        disabled={!isEditing || originalValues[field] === currentValues[field]}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditToggle(field)}
                        title={isEditing ? 'Save changes' : 'Edit field'}>
                        {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <Dialog open={isAccountOpen} onOpenChange={setIsAccountOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Account Settings</DialogTitle>
                    <DialogDescription>View and manage your AWS S3 account credentials here.</DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="space-y-8">
                        {renderCredentialField('accessKey', 'Access Key ID')}
                        {renderCredentialField('secretAccessKey', 'Secret Access Key', 'password')}
                        {renderCredentialField('bucketName', 'Bucket Name')}
                        {renderCredentialField('bucketRegion', 'Bucket Region')}
                    </div>

                    <div className="mt-12 flex justify-center">
                        <Button variant="link" onClick={handleLogout} className="flex w-[60%] items-center gap-2">
                            {isLoggingOut ? (
                                <Loader className="h-4 w-4 animate-spin" />
                            ) : (
                                <LogOut className="h-4 w-4" />
                            )}
                            Logout
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
