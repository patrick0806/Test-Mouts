import { JwtService } from '@nestjs/jwt';
import { LocalStrategy } from '../../strategies/local.strategy';
import { LoginRequestDTO } from './dtos/request.dto';
export declare class LoginService {
    private localStrategy;
    private jwtService;
    constructor(localStrategy: LocalStrategy, jwtService: JwtService);
    execute(loginData: LoginRequestDTO): Promise<string>;
}
