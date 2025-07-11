"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
const defaultResponses_swagger_1 = require("./defaultResponses.swagger");
class SwaggerConfig {
    static documentation = new swagger_1.DocumentBuilder()
        .setTitle('User api')
        .setVersion('1.0')
        .setContact('Patrick da Silva Nicezi', 'https://github.com/patrick0806', 'patrickk0806@gmail.com')
        .addBearerAuth()
        .build();
    setupSwagger(path, app) {
        const document = this.createDocument(app);
        this.defineGlobalResponses({
            document,
            excludedPaths: ['/api/v1/health'],
            methods: ['get', 'post', 'put', 'patch', 'delete'],
            responses: defaultResponses_swagger_1.defaultResponses,
        });
        swagger_1.SwaggerModule.setup(path, app, document);
    }
    createDocument(app) {
        return swagger_1.SwaggerModule.createDocument(app, SwaggerConfig.documentation);
    }
    defineGlobalResponses({ document, excludedPaths, methods, responses, }) {
        for (const key in document.paths) {
            if (!excludedPaths.includes(key)) {
                methods.forEach((method) => {
                    if (document.paths[key][method]) {
                        document.paths[key][method].responses = {
                            ...responses,
                            ...document.paths[key][method].responses,
                        };
                    }
                });
            }
        }
    }
}
exports.SwaggerConfig = SwaggerConfig;
//# sourceMappingURL=swagger.config.js.map