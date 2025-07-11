import helmet from '@fastify/helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { SwaggerConfig } from '@/config/swagger/swagger.config';

import { ValidationException } from '@/shared/exceptions';
import {
  HttpExceptionFilter,
  ValidationExceptionFilter,
} from '@/shared/filters';
import { BuildResponseInterceptor } from '@/shared/interceptors';

import { AppModule } from './app.module';
import env from '@/config/env';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix("/api");
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.enableShutdownHooks()
  const swaggerConfig = new SwaggerConfig();
  swaggerConfig.setupSwagger(`/api/docs`, app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (validationErrors) => {
        throw new ValidationException(validationErrors);
      },
    }),
  );

  app.useGlobalInterceptors(new BuildResponseInterceptor());
  app.useGlobalFilters(
    new ValidationExceptionFilter(),
    new HttpExceptionFilter(),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, access-token, Authorization',
    exposedHeaders: 'access-token'
  });
  await app.register(helmet);

  await app.listen(env().application.port || 3000);
}
bootstrap()
