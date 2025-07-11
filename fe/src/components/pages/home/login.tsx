"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreateUserForm } from './createUser';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
})

type LoginData = z.infer<typeof loginSchema>;

export function LoginForm() {
    const router = useRouter();
    const form = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const onSubmit = async (data: LoginData) => {
        try {
            const response = await api.post('/auth/login', data);
            const accessToken = response.headers['access-token'] || '';
            if (accessToken) {
                localStorage.setItem('token', accessToken);
                router.push("/dashboard");
                toast.success('Login successfully');
            } else {
                toast.error('Fail to set accessToken');
            }
        } catch (error: any) {
            console.log(error);
            toast.error('Fail on login', {
                description: error?.response?.data.message
            })
        }
    }
    return (
        <Card>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input placeholder="type your email here" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="type your password here" type='password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Login</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <CreateUserForm />
            </CardFooter>
        </Card>
    )
}