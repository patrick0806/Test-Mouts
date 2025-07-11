"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = () => ({
    application: {
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development',
    },
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: Number(process.env.DATABASE_PORT) || 5432,
        name: process.env.DATABASE_NAME || 'referer',
        user: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        ttl: Number(process.env.REDIS_TTL) || 300,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secret',
        expiresIn: '1d',
    },
});
//# sourceMappingURL=index.js.map