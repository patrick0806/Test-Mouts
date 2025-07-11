import type { FastifyReply } from "fastify";
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '@/shared/decorators/public.decorator';

import { LoginRequestDTO } from './dtos/request.dto';
import { LoginService } from './login.service';

@Public()
@ApiTags('Auth')
@Controller({ version: '1', path: 'login' })
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @ApiOperation({ summary: 'Login' })
  @Post()
  async handle(@Body() loginData: LoginRequestDTO, @Res() res: FastifyReply): Promise<any> {
    const accessToken = await this.loginService.execute(loginData);
    res.header('access-token', accessToken);
    return res.send();
  }
}
