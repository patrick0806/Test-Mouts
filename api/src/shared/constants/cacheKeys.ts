export const CACHE_KEYS = {
    LIST_USERS: (page: number, size: number) => `users:page:${page}:size:${size}`,
    FIND_USER_BY_ID: (id: number) => `users:${id}`,
}