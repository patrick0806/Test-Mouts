import { ILogParams } from '@/shared/interfaces/log.interface';
export declare class LogBuilderService {
    private static instance;
    private logger;
    private constructor();
    static getInstance(): LogBuilderService;
    build(params: ILogParams): void;
}
