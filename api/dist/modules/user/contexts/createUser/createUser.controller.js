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
exports.CreateUserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../../../shared/decorators/public.decorator");
const request_dto_1 = require("./dtos/request.dto");
const createUser_service_1 = require("./createUser.service");
let CreateUserController = class CreateUserController {
    service;
    constructor(service) {
        this.service = service;
    }
    async handle(data) {
        return this.service.execute(data);
    }
};
exports.CreateUserController = CreateUserController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create user' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.CreateUserRequestDTO]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], CreateUserController.prototype, "handle", null);
exports.CreateUserController = CreateUserController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)({ version: '1' }),
    __metadata("design:paramtypes", [createUser_service_1.CreateUserService])
], CreateUserController);
//# sourceMappingURL=createUser.controller.js.map