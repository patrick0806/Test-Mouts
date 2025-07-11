"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const jwtAuth_guard_1 = require("./shared/guards/jwtAuth.guard");
const dataSource_1 = require("./config/typeorm/dataSource");
const user_module_1 = require("./modules/user/user.module");
const auth_module_1 = require("./modules/auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(dataSource_1.dataSource.options),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            core_1.RouterModule.register([
                {
                    path: 'auth',
                    module: auth_module_1.AuthModule
                },
                {
                    path: 'users',
                    module: user_module_1.UserModule,
                }
            ]),
        ],
        controllers: [],
        providers: [
            {
                provide: 'APP_GUARD',
                useClass: jwtAuth_guard_1.JWTAuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map