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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("../../../../shared/dto/user.dto");
const user_repository_1 = require("../../../../shared/repository/user.repository");
const hash_util_1 = require("../../../../shared/utils/hash.util");
const class_transformer_1 = require("class-transformer");
let CreateUserService = class CreateUserService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute({ email, password, name }) {
        const alreayExists = await this.repository.findByEmail(email);
        if (alreayExists) {
            throw new common_1.ConflictException("Already exits a user with this email");
        }
        const hash = (0, hash_util_1.generateHash)(password);
        const user = await this.repository.save({
            name,
            email,
            password: hash
        });
        return (0, class_transformer_1.plainToInstance)(user_dto_1.UserDTO, user);
    }
};
exports.CreateUserService = CreateUserService;
exports.CreateUserService = CreateUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], CreateUserService);
//# sourceMappingURL=createUser.service.js.map