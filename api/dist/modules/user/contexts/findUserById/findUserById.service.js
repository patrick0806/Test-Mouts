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
exports.FindUserByIdService = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("../../../../shared/dto/user.dto");
const user_repository_1 = require("../../../../shared/repository/user.repository");
const class_transformer_1 = require("class-transformer");
const cache_manager_1 = require("@nestjs/cache-manager");
const cacheKeys_1 = require("../../../../shared/constants/cacheKeys");
let FindUserByIdService = class FindUserByIdService {
    cacheManager;
    repository;
    constructor(cacheManager, repository) {
        this.cacheManager = cacheManager;
        this.repository = repository;
    }
    async execute(id) {
        const cacheKey = cacheKeys_1.CACHE_KEYS.FIND_USER_BY_ID(id);
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) {
            return cached;
        }
        const user = await this.repository.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const userDTO = (0, class_transformer_1.plainToInstance)(user_dto_1.UserDTO, user);
        await this.cacheManager.set(cacheKey, userDTO, 10000);
        return userDTO;
    }
};
exports.FindUserByIdService = FindUserByIdService;
exports.FindUserByIdService = FindUserByIdService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeof (_a = typeof cache_manager_1.Cache !== "undefined" && cache_manager_1.Cache) === "function" ? _a : Object, user_repository_1.UserRepository])
], FindUserByIdService);
//# sourceMappingURL=findUserById.service.js.map