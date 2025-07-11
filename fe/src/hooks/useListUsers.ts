import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useListUsers(page: number, size: number) {
    return useQuery({
        queryKey: ['users', page, size],
        queryFn: async () => {
            const response = await api.get<{
                page: number,
                size: number,
                totalElements: number,
                totalPages: number,
                content: { id: number, name: string, email: string, role: string }[]
            }>(`/users?page=${page}&size=${size}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        }
    })
}