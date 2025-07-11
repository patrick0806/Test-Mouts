"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = require("@fastify/helmet");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const swagger_config_1 = require("./config/swagger/swagger.config");
const exceptions_1 = require("./shared/exceptions");
const filters_1 = require("./shared/filters");
const interceptors_1 = require("./shared/interceptors");
const app_module_1 = require("./app.module");
const env_1 = require("./config/env");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.setGlobalPrefix("/api");
    app.enableVersioning({ type: common_1.VersioningType.URI, defaultVersion: '1' });
    app.enableShutdownHooks();
    const swaggerConfig = new swagger_config_1.SwaggerConfig();
    swaggerConfig.setupSwagger(`/api/docs`, app);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        exceptionFactory: (validationErrors) => {
            throw new exceptions_1.ValidationException(validationErrors);
        },
    }));
    app.useGlobalInterceptors(new interceptors_1.BuildResponseInterceptor());
    app.useGlobalFilters(new filters_1.ValidationExceptionFilter(), new filters_1.HttpExceptionFilter());
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept, access-token, Authorization',
        exposedHeaders: 'access-token'
    });
    await app.register(helmet_1.default);
    await app.listen((0, env_1.default)().application.port || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map