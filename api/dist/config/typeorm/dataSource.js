"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = exports.databaseOptions = void 0;
const path = require("path");
const typeorm_1 = require("typeorm");
const env_1 = require("../env");
exports.databaseOptions = {
    type: 'postgres',
    host: (0, env_1.default)().database.host,
    port: (0, env_1.default)().database.port,
    username: (0, env_1.default)().database.user,
    password: (0, env_1.default)().database.password,
    database: (0, env_1.default)().database.name,
    synchronize: false,
    logging: ['error'],
    entities: [
        path.join(__dirname, '..', '..', 'shared', 'entities', '*.entity.{ts,js}'),
    ],
    migrations: [path.join(__dirname, 'migrations', '*{.js,.ts}')],
    subscribers: [
        path.join(__dirname, '..', '..', 'shared', 'entities', 'subscribers', '*.entity.subscriber.{ts,js}'),
    ],
};
exports.dataSource = new typeorm_1.DataSource({ ...exports.databaseOptions });
//# sourceMappingURL=dataSource.js.map