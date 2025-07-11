import { HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException {
  name: string;
  message: string;
  status: number;
  error: string;
  fields: Array<{
    name: string;
    reason: string;
  }>;

  constructor(validationErrors: ValidationError[]) {
    const fieldsErrors = validationErrors.flatMap((error) => {
      if (!error.constraints) return [];

      return Object.keys(error.constraints).map((rule) => ({
        name: error.property,
        reason: error.constraints?.[rule] || 'Unknown validation error',
      }));
    });

    this.name = 'ValidationException';
    this.error = 'Invalid params';
    this.message = 'Invalid params send in request';
    this.status = HttpStatus.BAD_REQUEST;
    this.fields = fieldsErrors;
  }
}
