"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../exceptions");
const providers_1 = require("../providers");
const exception_dto_1 = require("../dto/exception.dto");
let ValidationExceptionFilter = class ValidationExceptionFilter {
    logger = providers_1.LogBuilderService.getInstance();
    catch(exception, host) {
        const context = host.switchToHttp();
        const request = context.getRequest();
        const response = context.getResponse();
        const exceptionDeatils = new exception_dto_1.ExceptionDetail('Invalid fields', exception.fields);
        const exceptionResponse = new exception_dto_1.ExceptionDTO(common_1.HttpStatus.BAD_REQUEST, 'Bad Request', request.url, 'Invalid fields send in request', [exceptionDeatils]);
        this.logger.build({
            code: exception.error,
            message: exception.message,
            details: exceptionDeatils,
            level: 'warn',
            timestamp: new Date().toISOString(),
            method: request.method,
            path: request.url,
            statusCode: common_1.HttpStatus.BAD_REQUEST
        });
        response.code(common_1.HttpStatus.BAD_REQUEST).send(exceptionResponse);
    }
};
exports.ValidationExceptionFilter = ValidationExceptionFilter;
exports.ValidationExceptionFilter = ValidationExceptionFilter = __decorate([
    (0, common_1.Catch)(exceptions_1.ValidationException)
], ValidationExceptionFilter);
//# sourceMappingURL=validationException.filter.js.map