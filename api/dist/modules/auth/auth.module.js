"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const login_controller_1 = require("./contexts/login/login.controller");
const login_service_1 = require("./contexts/login/login.service");
const user_repository_1 = require("../../shared/repository/user.repository");
const local_strategy_1 = require("./strategies/local.strategy");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const env_1 = require("../../config/env");
const jwt_1 = require("@nestjs/jwt");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: (0, env_1.default)().jwt.secret,
                signOptions: { expiresIn: (0, env_1.default)().jwt.expiresIn },
            })
        ],
        controllers: [login_controller_1.LoginController],
        providers: [login_service_1.LoginService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy, user_repository_1.UserRepository],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map