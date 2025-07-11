import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '@/shared/decorators/public.decorator';

import { CreateUserRequestDTO } from './dtos/request.dto';
import { CreateUserService } from './createUser.service';
import { UserDTO } from '@/shared/dto/user.dto';

@Public()
@ApiTags('user')
@Controller({ version: '1' })
export class CreateUserController {
    constructor(private readonly service: CreateUserService) { }

    @ApiOperation({ summary: 'Create user' })
    @Post()
    async handle(@Body() data: CreateUserRequestDTO): Promise<UserDTO> {
        return this.service.execute(data);
    }
}