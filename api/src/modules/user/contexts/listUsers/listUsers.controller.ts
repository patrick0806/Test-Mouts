import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

import { ListUsersService } from './listUsers.service';
import { ListUsersRequestDTO } from './dtos/request.dto';

@ApiTags('user')
@ApiBearerAuth()
@Controller({ version: '1' })
export class ListUsersController {
    constructor(private readonly service: ListUsersService) { }

    @ApiOperation({ summary: 'List users' })
    @UseInterceptors(CacheInterceptor)
    @CacheKey('list_users')
    @Get()
    async handle(@Query() data: ListUsersRequestDTO): Promise<any> {
        return this.service.execute(data);
    }
}