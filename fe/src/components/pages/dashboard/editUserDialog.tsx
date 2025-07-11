'use client';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEditUser } from '@/hooks/useEditUser';
import { useGetUser } from '@/hooks/useGetUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import * as React from 'react';

const editUserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
});

type EditUserData = z.infer<typeof editUserSchema>;

export function EditUserDialog({ userId, name, email, onClose }: { userId: number; onClose: () => void, name: string, email: string }) {
    const { data: user } = useGetUser(userId);
    const editUser = useEditUser();

    const form = useForm<EditUserData>({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
            name: name,
            email: email
        }
    });

    React.useEffect(() => {
        if (user) {
            form.reset({
                name: user.name,
                email: user.email
            });
        }
    }, [user, form]);

    const onSubmit = async (data: EditUserData) => {
        editUser.mutate(
            { id: userId, data },
            { onSuccess: onClose }
        );
    };

    return (
        <DialogContent>
            <DialogHeader>Edit User</DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={editUser.isPending}>Save Changes</Button>
                </form>
            </Form>
        </DialogContent>
    );
}