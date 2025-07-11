import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
declare const JWTAuthGuard_base: any;
export declare class JWTAuthGuard extends JWTAuthGuard_base {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): any;
}
export {};
