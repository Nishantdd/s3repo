'use client';

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatBytes } from '@/lib/helpers';
import GroupData from '@/types/groupData';
import { CheckCircle2, File, Folder, UploadCloud, X, XCircle } from 'lucide-react';

interface UploaderProps {
    isUploaderOpen: boolean;
    setIsUploaderOpen: Dispatch<SetStateAction<boolean>>;
    setGroupsData: Dispatch<SetStateAction<GroupData[]>>;
    selectedGroup: GroupData | undefined;
}

interface FileUploadState {
    file: File;
    progress: number;
    status: 'pending' | 'uploading' | 'completed' | 'failed';
    error?: string;
}

export function Uploader({ isUploaderOpen, setIsUploaderOpen, setGroupsData, selectedGroup }: UploaderProps) {
    const [uploadMode, setUploadMode] = useState<'file' | 'folder'>('file');
    const [files, setFiles] = useState<FileUploadState[]>([]);
    const [groupName, setGroupName] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);

    useEffect(() => {
        if (uploadMode === 'file') {
            setGroupName(selectedGroup?.name || '');
        }
    }, [selectedGroup, uploadMode]);

    const uploadReport = useMemo(() => {
        if (!isUploading) return null;

        const totalFiles = files.length;
        const completedFiles = files.filter(f => f.status === 'completed').length;
        const totalSize = files.reduce((acc, f) => acc + f.file.size, 0);

        const uploadedSize = files.reduce((acc, f) => {
            if (f.status === 'completed') return acc + f.file.size;
            return acc + (f.file.size * f.progress) / 100;
        }, 0);

        const elapsedTime = startTime ? (Date.now() - startTime) / 1000 : 0;
        const uploadSpeed = elapsedTime > 0 ? uploadedSize / elapsedTime : 0;

        return {
            totalFiles,
            completedFiles,
            totalSize,
            uploadedSize,
            uploadSpeed,
            overallProgress: totalSize > 0 ? (uploadedSize / totalSize) * 100 : 0,
            isComplete: completedFiles + files.filter(f => f.status === 'failed').length === totalFiles
        };
    }, [files, isUploading, startTime]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || []);
        if (selectedFiles.length === 0) return;

        setFiles(
            selectedFiles.map(file => ({
                file,
                progress: 0,
                status: 'pending'
            }))
        );

        if (event.target.webkitdirectory) {
            const folderName = selectedFiles[0]?.webkitRelativePath.split('/')[0];
            if (folderName) {
                setGroupName(folderName);
            }
        }
    };

    const handleRemoveFile = (filePath: string) => {
        setFiles(prev => prev.filter(f => (f.file.webkitRelativePath || f.file.name) !== filePath));
    };

    const uploadFile = (fileState: FileUploadState, targetGroup: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            const { file } = fileState;

            const updateState = (progress: number, status: FileUploadState['status'], error?: string) => {
                setFiles(prev => prev.map(f => (f.file === file ? { ...f, progress, status, error } : f)));
            };

            fetch(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/generate-upload-url`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    groupName: targetGroup,
                    filename: file.name,
                    contentType: file.type
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        const errMessage = res.error || 'Failed to get upload url.';
                        reject(new Error(errMessage));
                        updateState(0, 'failed', errMessage);
                    }

                    const { signedUrl } = res;
                    if (!signedUrl) {
                        const errMessage = 'Received an empty upload URL from the server.';
                        reject(new Error(errMessage));
                        updateState(0, 'failed', errMessage);
                    }

                    // We use XMLHttpRequest here to get upload progress.
                    const xhr = new XMLHttpRequest();
                    xhr.open('PUT', signedUrl, true);
                    xhr.setRequestHeader('Content-Type', file.type);

                    xhr.upload.onprogress = event => {
                        if (event.lengthComputable) {
                            const progress = (event.loaded / event.total) * 100;
                            updateState(progress, 'uploading');
                        }
                    };

                    xhr.onload = () => {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            updateState(100, 'completed');
                            resolve();
                        } else {
                            const errorMsg = `S3 upload failed: ${xhr.statusText || 'Unknown error'}`;
                            updateState(fileState.progress, 'failed', errorMsg);
                            reject(new Error(errorMsg));
                        }
                    };

                    xhr.onerror = () => {
                        const errorMsg = 'A network error occurred during S3 upload.';
                        updateState(fileState.progress, 'failed', errorMsg);
                        reject(new Error(errorMsg));
                    };

                    xhr.send(file);
                })
                .catch(err => {
                    updateState(0, 'failed', (err as Error).message);
                    reject(err);
                });
        });
    };

    const handleUpload = async () => {
        if (!groupName.trim()) {
            alert('Group name cannot be empty.');
            return;
        }

        setIsUploading(true);
        setStartTime(Date.now());

        await Promise.allSettled(files.map(fileState => uploadFile(fileState, groupName)));

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/images`, { credentials: 'include' });
            if (!res.ok) throw new Error('Failed to fetch updated data.');
            const updatedData = await res.json();
            setGroupsData(updatedData.data);
        } catch (error) {
            console.error(error);
        }
    };

    const resetStateAndClose = () => {
        setIsUploaderOpen(false);
        setTimeout(() => {
            setFiles([]);
            setIsUploading(false);
            setStartTime(null);
        }, 300);
    };

    const renderPreUploadList = () => (
        <div className="space-y-4">
            <div className="space-y-1.5">
                <Label htmlFor="groupName">Upload to Group</Label>
                <Input
                    id="groupName"
                    value={groupName}
                    onChange={e => setGroupName(e.target.value)}
                    disabled={isUploading}
                    placeholder="e.g., Summer Vacation Photos"
                />
            </div>
            <h3 className="text-base font-semibold">Review Files ({files.length})</h3>
            <ScrollArea className="h-52 w-full rounded-md border">
                <div className="p-2">
                    {files.map(({ file }) => {
                        const filePath = file.webkitRelativePath || file.name;
                        return (
                            <div key={filePath} className="hover:bg-muted/50 flex items-center justify-between p-2">
                                <div className="flex min-w-0 items-center gap-3">
                                    <File className="h-5 w-5 flex-shrink-0" />
                                    <div className="flex min-w-0 flex-col">
                                        <span className="truncate text-sm font-medium">{file.name}</span>
                                        <span className="text-muted-foreground text-xs">{formatBytes(file.size)}</span>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="flex-shrink-0"
                                    onClick={() => handleRemoveFile(filePath)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>
        </div>
    );

    const renderFileDropzone = (mode: 'file' | 'folder') => (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 text-center">
            {mode === 'file' ? (
                <File className="text-muted-foreground h-12 w-12" />
            ) : (
                <Folder className="text-muted-foreground h-12 w-12" />
            )}
            <p className="mt-4 font-semibold">Drag & drop your {mode}s here</p>
            <p className="text-muted-foreground text-sm">or click the button below to browse</p>
            <Input
                type="file"
                className="hidden"
                id={`${mode}-upload-input`}
                onChange={handleFileSelect}
                multiple={mode === 'file'}
                {...(mode === 'folder' ? { webkitdirectory: 'true' } : {})}
            />
            <Button asChild variant="outline" className="mt-4">
                <Label htmlFor={`${mode}-upload-input`}>Browse {mode === 'file' ? 'Files' : 'Folder'}</Label>
            </Button>
        </div>
    );

    const renderProgressView = () => (
        <div className="space-y-4">
            {uploadReport && (
                <div className="space-y-3 rounded-lg border p-4">
                    <div className="flex items-center justify-between text-sm font-medium">
                        <span>{uploadReport.isComplete ? 'Upload Complete' : 'Uploading...'}</span>
                        <span>
                            {uploadReport.completedFiles} / {uploadReport.totalFiles} Files
                        </span>
                    </div>
                    <Progress value={uploadReport.overallProgress} />
                    <div className="text-muted-foreground flex items-center justify-between text-xs">
                        <span>
                            {formatBytes(uploadReport.uploadedSize)} / {formatBytes(uploadReport.totalSize)}
                        </span>
                        <span>{formatBytes(uploadReport.uploadSpeed)}/s</span>
                    </div>
                </div>
            )}
            <ScrollArea className="h-60 w-full">
                <div className="space-y-3 p-1">
                    {files.map(({ file, progress, status, error }) => (
                        <div key={file.webkitRelativePath || file.name} className="rounded-md border p-2">
                            <div className="flex items-center justify-between">
                                <div className="flex min-w-0 items-center gap-3">
                                    {status === 'completed' && (
                                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500" />
                                    )}
                                    {status === 'failed' && <XCircle className="h-5 w-5 flex-shrink-0 text-red-500" />}
                                    {(status === 'pending' || status === 'uploading') && (
                                        <UploadCloud className="h-5 w-5 flex-shrink-0 animate-pulse text-blue-500" />
                                    )}
                                    <span className="truncate text-sm font-medium">{file.name}</span>
                                </div>
                                <span className="text-muted-foreground text-sm">{formatBytes(file.size)}</span>
                            </div>
                            {status === 'uploading' && <Progress value={progress} className="mt-2 h-1.5" />}
                            {status === 'failed' && <p className="mt-1 text-xs text-red-600">Error: {error}</p>}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );

    const renderContent = () => {
        if (isUploading) return renderProgressView();
        if (files.length > 0) return renderPreUploadList();
        return (
            <Tabs value={uploadMode} onValueChange={value => setUploadMode(value as 'file' | 'folder')}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="file">Upload Files</TabsTrigger>
                    <TabsTrigger value="folder">Upload Folder</TabsTrigger>
                </TabsList>
                <TabsContent value="file" className="pt-4">
                    {renderFileDropzone('file')}
                </TabsContent>
                <TabsContent value="folder" className="pt-4">
                    {renderFileDropzone('folder')}
                </TabsContent>
            </Tabs>
        );
    };

    return (
        <Dialog open={isUploaderOpen} onOpenChange={setIsUploaderOpen}>
            <DialogContent
                className="sm:max-w-lg"
                onInteractOutside={e => e.preventDefault()}
                onCloseAutoFocus={resetStateAndClose}>
                <DialogHeader>
                    <DialogTitle>Upload to S3 Repository</DialogTitle>
                    <DialogDescription>
                        Select files or a folder. Uploads will be organized into the specified group.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">{renderContent()}</div>
                <DialogFooter>
                    {uploadReport?.isComplete ? (
                        <Button onClick={resetStateAndClose} className="w-full">
                            Done
                        </Button>
                    ) : (
                        <>
                            <Button variant="outline" onClick={resetStateAndClose} disabled={isUploading}>
                                Cancel
                            </Button>
                            <Button onClick={handleUpload} disabled={files.length === 0 || isUploading}>
                                {isUploading ? 'Uploading...' : `Upload ${files.length} Item(s)`}
                            </Button>
                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
