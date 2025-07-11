"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogBuilderService = void 0;
const winston_1 = require("winston");
class LogBuilderService {
    static instance;
    logger;
    constructor() {
        const appTransports = [
            new winston_1.transports.Console({
                format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
            }),
        ];
        if (process.env.NODE_ENV === 'production') {
            appTransports.push(new winston_1.transports.File({
                filename: 'logs/error.log',
                level: 'error',
            }));
        }
        this.logger = (0, winston_1.createLogger)({
            transports: appTransports,
        });
    }
    static getInstance() {
        if (!LogBuilderService.instance) {
            LogBuilderService.instance = new LogBuilderService();
        }
        return LogBuilderService.instance;
    }
    build(params) {
        const log = {
            code: params.code,
            message: params.message,
            details: params.details,
            level: params.level,
            method: params.method,
            statusCode: params.statusCode,
            path: params.path,
            timestamp: params.timestamp
        };
        this.logger.log(log.level, JSON.stringify(log, null, 2));
    }
}
exports.LogBuilderService = LogBuilderService;
//# sourceMappingURL=LogBuilder.service.js.map