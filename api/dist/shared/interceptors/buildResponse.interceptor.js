"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const providers_1 = require("../providers");
let BuildResponseInterceptor = class BuildResponseInterceptor {
    logger = providers_1.LogBuilderService.getInstance();
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.map)((params) => {
            const request = context.switchToHttp().getRequest();
            if (!request.url.includes('health')) {
                this.logger.build({
                    ...params, level: 'info',
                    path: request.url,
                    method: request.method,
                    statusCode: 200,
                });
            }
            return params?.data || params;
        }));
    }
};
exports.BuildResponseInterceptor = BuildResponseInterceptor;
exports.BuildResponseInterceptor = BuildResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], BuildResponseInterceptor);
//# sourceMappingURL=buildResponse.interceptor.js.map