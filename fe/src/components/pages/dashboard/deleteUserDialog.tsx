'use client';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useDeleteUser } from '@/hooks/useDeleteUser';
import * as React from 'react';

export function DeleteUserDialog({ userId, onClose }: { userId: number; onClose: () => void }) {
    const deleteUser = useDeleteUser();

    const handleDelete = React.useCallback(() => {
        deleteUser.mutate(userId, {
            onSuccess: onClose
        });
    }, [deleteUser, userId, onClose]);

    return (
        <DialogContent>
            <DialogHeader>Delete User</DialogHeader>
            <div className="space-y-4">
                <p>Are you sure you want to delete this user? This action cannot be undone.</p>
                <div className="flex justify-end gap-4">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={deleteUser.isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleteUser.isPending}
                    >
                        {deleteUser.isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                </div>
            </div>
        </DialogContent>
    );
}