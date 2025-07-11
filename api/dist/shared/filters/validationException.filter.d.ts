import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { ValidationException } from '@/shared/exceptions';
export declare class ValidationExceptionFilter implements ExceptionFilter {
    private logger;
    catch(exception: ValidationException, host: ArgumentsHost): void;
}
