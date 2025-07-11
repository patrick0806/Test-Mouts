import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { DeleteUserService } from './deleteUser.service';

@ApiTags('user')
@ApiBearerAuth()
@Controller({ version: '1' })
export class DeleteUserController {
    constructor(private readonly service: DeleteUserService) { }

    @ApiOperation({ summary: 'Delete user' })
    @Delete(':id')
    @HttpCode(204)
    async handle(@Param('id') id: number): Promise<void> {
        return this.service.execute(id);
    }
}