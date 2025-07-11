import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type EditUserData = {
    name: string;
    email: string;
};

export function useEditUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: EditUserData }) => {
            const response = await api.put(`/users/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
            toast.success('User updated successfully');
        },
        onError: (error: any) => {
            toast.error('Failed to update user', {
                description: error?.response?.data?.message
            });
        }
    });
}