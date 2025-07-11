"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const redisStore = require("cache-manager-redis-store");
const createUser_controller_1 = require("./contexts/createUser/createUser.controller");
const createUser_service_1 = require("./contexts/createUser/createUser.service");
const deleteUser_controller_1 = require("./contexts/deleteUser/deleteUser.controller");
const deleteUser_service_1 = require("./contexts/deleteUser/deleteUser.service");
const findUserById_controller_1 = require("./contexts/findUserById/findUserById.controller");
const findUserById_service_1 = require("./contexts/findUserById/findUserById.service");
const listUsers_controller_1 = require("./contexts/listUsers/listUsers.controller");
const listUsers_service_1 = require("./contexts/listUsers/listUsers.service");
const updateUser_controller_1 = require("./contexts/updateUser/updateUser.controller");
const updateUser_service_1 = require("./contexts/updateUser/updateUser.service");
const cache_manager_1 = require("@nestjs/cache-manager");
const env_1 = require("../../config/env");
const user_repository_1 = require("../../shared/repository/user.repository");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.register({
                store: redisStore,
                host: (0, env_1.default)().redis.host,
                port: (0, env_1.default)().redis.port,
                ttl: (0, env_1.default)().redis.ttl,
            }),
        ],
        controllers: [
            createUser_controller_1.CreateUserController,
            deleteUser_controller_1.DeleteUserController,
            findUserById_controller_1.FindUserByIdController,
            listUsers_controller_1.ListUsersController,
            updateUser_controller_1.UpdateUserController,
        ],
        providers: [
            createUser_service_1.CreateUserService,
            deleteUser_service_1.DeleteUserService,
            findUserById_service_1.FindUserByIdService,
            listUsers_service_1.ListUsersService,
            updateUser_service_1.UpdateUserService,
            user_repository_1.UserRepository,
        ],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map