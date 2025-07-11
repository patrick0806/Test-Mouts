import type { FastifyReply } from "fastify";
import { LoginRequestDTO } from './dtos/request.dto';
import { LoginService } from './login.service';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    handle(loginData: LoginRequestDTO, res: FastifyReply): Promise<any>;
}
