"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CACHE_KEYS = void 0;
exports.CACHE_KEYS = {
    LIST_USERS: (page, size) => `users:page:${page}:size:${size}`,
    FIND_USER_BY_ID: (id) => `users:${id}`,
};
//# sourceMappingURL=cacheKeys.js.map