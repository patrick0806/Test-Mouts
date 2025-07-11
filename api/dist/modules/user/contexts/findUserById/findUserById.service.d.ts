import { UserDTO } from "@/shared/dto/user.dto";
import { UserRepository } from "@/shared/repository/user.repository";
import { Cache } from "@nestjs/cache-manager";
export declare class FindUserByIdService {
    private cacheManager;
    private repository;
    constructor(cacheManager: Cache, repository: UserRepository);
    execute(id: number): Promise<UserDTO>;
}
