export declare class ExceptionDetail {
    message: string;
    additionalProperties: Array<Record<string, any>>;
    constructor(message: string, additionalProperties: Array<Record<string, any>>);
}
export declare class ExceptionDTO {
    timestamp: string;
    status: number;
    error: string;
    path: string;
    message: string;
    code?: string;
    details?: ExceptionDetail[];
    constructor(status: number, error: string, path: string, message: string, details?: ExceptionDetail[]);
}
