import { Module } from "@nestjs/common";
import { LoginController } from "./contexts/login/login.controller";
import { LoginService } from "./contexts/login/login.service";
import { UserRepository } from "@/shared/repository/user.repository";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import env from "@/config/env";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.register({
            secret: env().jwt.secret,
            signOptions: { expiresIn: env().jwt.expiresIn },
        })
    ],
    controllers: [LoginController],
    providers: [LoginService, LocalStrategy, JwtStrategy, UserRepository],
})
export class AuthModule { }