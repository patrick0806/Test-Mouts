import { UserDTO } from "@/shared/dto/user.dto";
import { UserRepository } from "@/shared/repository/user.repository";
import { ListUsersRequestDTO } from "./dtos/request.dto";
import { Cache } from "@nestjs/cache-manager";
export declare class ListUsersService {
    private repository;
    private cacheManager;
    constructor(repository: UserRepository, cacheManager: Cache);
    execute({ page, size }: ListUsersRequestDTO): Promise<{
        page: number;
        size: number;
        totalElements: number;
        totalPages: number;
        content: UserDTO[];
    }>;
}
