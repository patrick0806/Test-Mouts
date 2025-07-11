import { UpdateUserRequestDTO } from './dtos/request.dto';
import { UpdateUserService } from './updateUser.service';
import { UserDTO } from '@/shared/dto/user.dto';
export declare class UpdateUserController {
    private readonly service;
    constructor(service: UpdateUserService);
    handle(id: number, data: UpdateUserRequestDTO): Promise<UserDTO>;
}
