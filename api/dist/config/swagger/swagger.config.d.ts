import { INestApplication } from '@nestjs/common';
export declare class SwaggerConfig {
    static documentation: any;
    setupSwagger(path: string, app: INestApplication<any>): void;
    private createDocument;
    private defineGlobalResponses;
}
