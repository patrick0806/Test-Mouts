import { FindUserByIdService } from './findUserById.service';
import { UserDTO } from '@/shared/dto/user.dto';
export declare class FindUserByIdController {
    private readonly service;
    constructor(service: FindUserByIdService);
    handle(id: number): Promise<UserDTO>;
}
