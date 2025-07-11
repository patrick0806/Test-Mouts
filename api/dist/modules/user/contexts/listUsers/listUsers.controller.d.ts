import { ListUsersService } from './listUsers.service';
import { ListUsersRequestDTO } from './dtos/request.dto';
export declare class ListUsersController {
    private readonly service;
    constructor(service: ListUsersService);
    handle(data: ListUsersRequestDTO): Promise<any>;
}
