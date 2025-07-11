import { ValidationError } from 'class-validator';
export declare class ValidationException {
    name: string;
    message: string;
    status: number;
    error: string;
    fields: Array<{
        name: string;
        reason: string;
    }>;
    constructor(validationErrors: ValidationError[]);
}
