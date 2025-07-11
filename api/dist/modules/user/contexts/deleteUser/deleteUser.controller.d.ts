import { DeleteUserService } from './deleteUser.service';
export declare class DeleteUserController {
    private readonly service;
    constructor(service: DeleteUserService);
    handle(id: number): Promise<void>;
}
