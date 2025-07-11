'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { CreateUserForm } from './createUser';
import { useListUsers } from '@/hooks/useListUsers';
import { useQueryClient } from '@tanstack/react-query';
import { EditUserDialog } from './editUserDialog';
import { DeleteUserDialog } from './deleteUserDialog';

export function UserTable() {
    const { data } = useListUsers(1, 10);
    const queryClient = useQueryClient();
    const [createOpen, setCreateOpen] = useState(false);
    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    const [deletingUserId, setDeletingUserId] = useState<number | null>(null);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Users</h2>
                <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>Create User</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>Create User</DialogHeader>
                        <CreateUserForm onSuccess={() => {
                            queryClient.invalidateQueries({ queryKey: ['users'] });
                            setCreateOpen(false);
                        }} />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="border rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="px-4 py-2 text-left">ID</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.content.map((user) => (
                            <tr key={user.id} className="border-b">
                                <td className="px-4 py-2">{user.id}</td>
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">
                                    <div className="flex gap-2">
                                        <Dialog open={editingUserId === user.id} onOpenChange={(open) => setEditingUserId(open ? user.id : null)}>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm">Edit</Button>
                                            </DialogTrigger>
                                            <EditUserDialog
                                                userId={user.id}
                                                name={user.name}
                                                email={user.email}
                                                onClose={() => {
                                                    queryClient.invalidateQueries({ queryKey: ['users'] });
                                                    setEditingUserId(null);
                                                }}
                                            />
                                        </Dialog>
                                        <Dialog open={deletingUserId === user.id} onOpenChange={(open) => setDeletingUserId(open ? user.id : null)}>
                                            <DialogTrigger asChild>
                                                <Button variant="destructive" size="sm">Delete</Button>
                                            </DialogTrigger>
                                            <DeleteUserDialog
                                                userId={user.id}
                                                onClose={() => {
                                                    queryClient.invalidateQueries({ queryKey: ['users'] });
                                                    setDeletingUserId(null);
                                                }}
                                            />
                                        </Dialog>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}