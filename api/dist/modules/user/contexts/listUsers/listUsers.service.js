"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUsersService = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("../../../../shared/dto/user.dto");
const user_repository_1 = require("../../../../shared/repository/user.repository");
const class_transformer_1 = require("class-transformer");
const cache_manager_1 = require("@nestjs/cache-manager");
const cacheKeys_1 = require("../../../../shared/constants/cacheKeys");
let ListUsersService = class ListUsersService {
    repository;
    cacheManager;
    constructor(repository, cacheManager) {
        this.repository = repository;
        this.cacheManager = cacheManager;
    }
    async execute({ page, size }) {
        const cacheKey = cacheKeys_1.CACHE_KEYS.LIST_USERS(page, size);
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) {
            return cached;
        }
        const [users, totalElements] = await this.repository.list(page, size);
        const totalPages = Math.ceil(totalElements / size);
        const response = {
            page,
            size,
            totalElements,
            totalPages,
            content: (0, class_transformer_1.plainToInstance)(user_dto_1.UserDTO, users)
        };
        await this.cacheManager.set(cacheKey, response, 10000);
        return response;
    }
};
exports.ListUsersService = ListUsersService;
exports.ListUsersService = ListUsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository, typeof (_a = typeof cache_manager_1.Cache !== "undefined" && cache_manager_1.Cache) === "function" ? _a : Object])
], ListUsersService);
//# sourceMappingURL=listUsers.service.js.map