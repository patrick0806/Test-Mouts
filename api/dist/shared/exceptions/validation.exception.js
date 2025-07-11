"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const common_1 = require("@nestjs/common");
class ValidationException {
    name;
    message;
    status;
    error;
    fields;
    constructor(validationErrors) {
        const fieldsErrors = validationErrors.flatMap((error) => {
            if (!error.constraints)
                return [];
            return Object.keys(error.constraints).map((rule) => ({
                name: error.property,
                reason: error.constraints?.[rule] || 'Unknown validation error',
            }));
        });
        this.name = 'ValidationException';
        this.error = 'Invalid params';
        this.message = 'Invalid params send in request';
        this.status = common_1.HttpStatus.BAD_REQUEST;
        this.fields = fieldsErrors;
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=validation.exception.js.map