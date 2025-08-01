'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RotateCcw, Edit, Save, LogOut, X, Loader } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import S3Credentials from '@/types/s3Credentials';

export default function Account({
    s3Credentials,
    setIsAccountOpen
}: {
    s3Credentials: S3Credentials;
    setIsAccountOpen: Dispatch<SetStateAction<boolean>>;
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

    useEffect(() => setCurrentValues(originalValues), [originalValues]);

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

    const handleEditToggle = (field: keyof S3Credentials) => {
        const isCurrentlyEditing = editStates[field];

        if (isCurrentlyEditing) {
            handleSave(field);
        }

        setEditStates(prev => ({
            ...prev,
            [field]: !isCurrentlyEditing
        }));
    };

    const handleSave = async (field: keyof S3Credentials) => {
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/update-s3-credentials`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ ...currentValues })
        })
            .then(res => res.json())
            .then(res => setOriginalValues(res.data))
            .catch(err => console.error(`Error saving ${field}: `, err.message));
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
                        type={type}
                        value={currentValues[field]}
                        onChange={e => handleInputChange(field, e.target.value)}
                        disabled={!isEditing}
                        className="flex-1"
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleReset(field)}
                        title="Reset to original value">
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
        <>
            <Button
                onClick={() => setIsAccountOpen(prev => !prev)}
                variant="ghost"
                className="absolute top-3 right-3 duration-75 active:scale-90">
                <X className="h-4 w-4" />
            </Button>
            <div className="mx-auto mt-16 max-w-sm space-y-6 p-6">
                <h1 className="text-center text-2xl font-bold">S3 Credentials</h1>

                <div className="space-y-8">
                    {renderCredentialField('accessKey', 'Access Key')}
                    {renderCredentialField('secretAccessKey', 'Secret Access Key', 'password')}
                    {renderCredentialField('bucketName', 'Bucket Name')}
                    {renderCredentialField('bucketRegion', 'Bucket Region')}
                </div>

                <Separator className="my-8" />

                <div className="flex justify-center">
                    <Button variant="default" onClick={handleLogout} className="flex w-[60%] items-center gap-2">
                        {isLoggingOut ? <Loader className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                        Logout
                    </Button>
                </div>
            </div>
        </>
    );
}
