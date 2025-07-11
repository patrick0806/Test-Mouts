export interface ILogParams {
    code: string;
    message: string;
    details: any;
    level: 'info' | 'error' | 'warn' | 'debug';
    method: string;
    path: string;
    timestamp: string;
    statusCode: number;
}