import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

import { LogBuilderService } from '@/shared/providers';

import { ExceptionDTO } from '@/shared/dto/exception.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = LogBuilderService.getInstance();
  catch(
    exception: HttpException & { error: string; message: string },
    host: ArgumentsHost,
  ) {
    const context = host.switchToHttp();
    const request = context.getRequest<FastifyRequest>();
    const response = context.getResponse<FastifyReply>();
    const statusCode =
      Number(exception.getStatus()) || HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = new ExceptionDTO(
      statusCode,
      exception.error,
      request.url,
      exception.message,
    );

    this.logger.build(
      {
        code: exception.error,
        message: exception.message,
        details: exceptionResponse,
        level:
          statusCode === HttpStatus.INTERNAL_SERVER_ERROR ? 'error' : 'warn',
        timestamp: new Date().toISOString(),
        method: request.method,
        path: request.url,
        statusCode,
      },
    );

    response.code(statusCode).send(exceptionResponse);
  }
}
