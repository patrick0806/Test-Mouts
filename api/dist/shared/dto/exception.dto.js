"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionDTO = exports.ExceptionDetail = void 0;
class ExceptionDetail {
    message;
    additionalProperties;
    constructor(message, additionalProperties) {
        this.message = message;
        this.additionalProperties = additionalProperties;
    }
}
exports.ExceptionDetail = ExceptionDetail;
class ExceptionDTO {
    timestamp;
    status;
    error;
    path;
    message;
    code;
    details;
    constructor(status, error, path, message, details) {
        this.timestamp = new Date().toISOString();
        this.status = status;
        this.error = error;
        this.path = path;
        this.message = message;
        this.details = details;
    }
}
exports.ExceptionDTO = ExceptionDTO;
//# sourceMappingURL=exception.dto.js.map