import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import env from '@/config/env';

import { LocalStrategy } from '../../strategies/local.strategy';

import { LoginRequestDTO } from './dtos/request.dto';

@Injectable()
export class LoginService {
  constructor(
    private localStrategy: LocalStrategy,
    private jwtService: JwtService,
  ) { }
  async execute(loginData: LoginRequestDTO): Promise<string> {
    const user = await this.localStrategy.validate(
      loginData.email,
      loginData.password,
    );

    return this.jwtService.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: env().jwt.expiresIn,
        secret: env().jwt.secret,
      },
    )
  }
}