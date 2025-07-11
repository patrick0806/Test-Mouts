import { CreateUserRequestDTO } from './dtos/request.dto';
import { CreateUserService } from './createUser.service';
import { UserDTO } from '@/shared/dto/user.dto';
export declare class CreateUserController {
    private readonly service;
    constructor(service: CreateUserService);
    handle(data: CreateUserRequestDTO): Promise<UserDTO>;
}
