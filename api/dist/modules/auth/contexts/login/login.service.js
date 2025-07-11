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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const env_1 = require("../../../../config/env");
const local_strategy_1 = require("../../strategies/local.strategy");
let LoginService = class LoginService {
    localStrategy;
    jwtService;
    constructor(localStrategy, jwtService) {
        this.localStrategy = localStrategy;
        this.jwtService = jwtService;
    }
    async execute(loginData) {
        const user = await this.localStrategy.validate(loginData.email, loginData.password);
        return this.jwtService.sign({
            id: user.id,
            name: user.name,
            email: user.email,
        }, {
            expiresIn: (0, env_1.default)().jwt.expiresIn,
            secret: (0, env_1.default)().jwt.secret,
        });
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [local_strategy_1.LocalStrategy, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], LoginService);
//# sourceMappingURL=login.service.js.map