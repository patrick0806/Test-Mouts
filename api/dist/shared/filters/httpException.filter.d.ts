import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private logger;
    catch(exception: HttpException & {
        error: string;
        message: string;
    }, host: ArgumentsHost): void;
}
