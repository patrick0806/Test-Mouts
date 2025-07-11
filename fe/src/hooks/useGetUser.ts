import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useGetUser(id: number) {
    return useQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            const response = await api.get(`/users/${id}`);
            return response.data;
        }
    })
}