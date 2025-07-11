import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UpdateUserRequestDTO } from './dtos/request.dto';
import { UpdateUserService } from './updateUser.service';
import { UserDTO } from '@/shared/dto/user.dto';

@ApiTags('user')
@ApiBearerAuth()
@Controller({ version: '1' })
export class UpdateUserController {
    constructor(private readonly service: UpdateUserService) { }

    @ApiOperation({ summary: 'Update user' })
    @Put(':id')
    async handle(@Param('id') id: number, @Body() data: UpdateUserRequestDTO): Promise<UserDTO> {
        return this.service.execute(id, data);
    }
}