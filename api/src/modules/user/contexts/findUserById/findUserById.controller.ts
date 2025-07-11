import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

import { FindUserByIdService } from './findUserById.service';
import { UserDTO } from '@/shared/dto/user.dto';

@ApiTags('user')
@ApiBearerAuth()
@Controller({ version: '1' })
export class FindUserByIdController {
    constructor(private readonly service: FindUserByIdService) { }

    @ApiOperation({ summary: 'Find user by id' })
    @UseInterceptors(CacheInterceptor)
    @CacheKey('find_user_by_id')
    @Get(':id')
    async handle(@Param('id') id: number): Promise<UserDTO> {
        return this.service.execute(id);
    }
}