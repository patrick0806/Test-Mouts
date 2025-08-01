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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
const typeorm_1 = require("typeorm");
let UserRepository = class UserRepository {
    datasource;
    repository;
    constructor(datasource) {
        this.datasource = datasource;
        this.repository = datasource.getRepository(user_entity_1.User);
    }
    async save(user) {
        return this.repository.save(user);
    }
    async findById(id) {
        return this.repository.findOneBy({ id });
    }
    async findByEmail(email) {
        return this.repository.findOneBy({ email });
    }
    async deleteById(id) {
        await this.repository.delete({ id });
    }
    async list(page, size) {
        return this.repository.findAndCount({
            order: { name: 'ASC' },
            skip: size * (page - 1),
            take: size
        });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], UserRepository);
//# sourceMappingURL=user.repository.js.map