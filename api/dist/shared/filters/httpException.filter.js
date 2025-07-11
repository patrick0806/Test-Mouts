"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const providers_1 = require("../providers");
const exception_dto_1 = require("../dto/exception.dto");
let HttpExceptionFilter = class HttpExceptionFilter {
    logger = providers_1.LogBuilderService.getInstance();
    catch(exception, host) {
        const context = host.switchToHttp();
        const request = context.getRequest();
        const response = context.getResponse();
        const statusCode = Number(exception.getStatus()) || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const exceptionResponse = new exception_dto_1.ExceptionDTO(statusCode, exception.error, request.url, exception.message);
        this.logger.build({
            code: exception.error,
            message: exception.message,
            details: exceptionResponse,
            level: statusCode === common_1.HttpStatus.INTERNAL_SERVER_ERROR ? 'error' : 'warn',
            timestamp: new Date().toISOString(),
            method: request.method,
            path: request.url,
            statusCode,
        });
        response.code(statusCode).send(exceptionResponse);
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
//# sourceMappingURL=httpException.filter.js.map