"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultResponses = void 0;
const common_1 = require("@nestjs/common");
const exception_dto_1 = require("../../shared/dto/exception.dto");
const badRequestResponse = {
    '400': {
        description: 'The request did not match the Data Transfer Object.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: new exception_dto_1.ExceptionDTO(common_1.HttpStatus.BAD_REQUEST, 'Bad Request', 'url', 'Invalid fields send in request', [
                        {
                            message: 'Invalid fields',
                            additionalProperties: [
                                {
                                    name: 'name',
                                    reason: 'reason',
                                },
                            ],
                        },
                    ]),
                },
            },
        },
    },
};
const unauthorizedResponse = {
    '401': {
        description: 'Added token is invalid or token type is incorrect',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: new exception_dto_1.ExceptionDTO(common_1.HttpStatus.UNAUTHORIZED, 'Unauthorized', 'url', 'Invalid token'),
                },
            },
        },
    },
};
const forbbidenResponse = {
    '403': {
        description: 'The user does not have permission to access the resource',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: new exception_dto_1.ExceptionDTO(common_1.HttpStatus.FORBIDDEN, 'Forbidden', 'url', 'User does not have permission to access the resource'),
                },
            },
        },
    },
};
const conflictResponse = {
    '409': {
        description: 'The request could not be completed due to a conflict with the current state of the target resource',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: new exception_dto_1.ExceptionDTO(common_1.HttpStatus.CONFLICT, 'Conflict', 'url', 'Conflict with the current state of the target resource'),
                },
            },
        },
    },
};
const notFoundResponse = {
    '404': {
        description: 'The requested resource was not found',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: new exception_dto_1.ExceptionDTO(common_1.HttpStatus.NOT_FOUND, 'Not Found', 'url', 'The requested resource was not found'),
                },
            },
        },
    },
};
const internalServerErrorResponse = {
    '500': {
        description: 'Internal server error',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: new exception_dto_1.ExceptionDTO(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', 'url', 'Internal server error'),
                },
            },
        },
    },
};
exports.defaultResponses = {
    ...badRequestResponse,
    ...unauthorizedResponse,
    ...forbbidenResponse,
    ...notFoundResponse,
    ...conflictResponse,
    ...internalServerErrorResponse,
};
//# sourceMappingURL=defaultResponses.swagger.js.map