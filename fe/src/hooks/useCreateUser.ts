import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type CreateUserData = {
    name: string;
    email: string;
    password: string;
};

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateUserData) => {
            const response = await api.post('/users', data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User created successfully');
        },
        onError: (error: any) => {
            toast.error('Failed to create user', {
                description: error?.response?.data?.message
            });
        }
    });
}