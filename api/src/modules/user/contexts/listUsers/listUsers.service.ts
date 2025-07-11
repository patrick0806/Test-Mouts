import { Inject, Injectable } from "@nestjs/common";
import { UserDTO } from "@/shared/dto/user.dto";
import { UserRepository } from "@/shared/repository/user.repository";
import { plainToInstance } from "class-transformer";
import { ListUsersRequestDTO } from "./dtos/request.dto";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { CACHE_KEYS } from "@/shared/constants/cacheKeys";

@Injectable()
export class ListUsersService {
    constructor(
        private repository: UserRepository,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async execute({ page, size }: ListUsersRequestDTO): Promise<{
        page: number,
        size: number,
        totalElements: number,
        totalPages: number,
        content: UserDTO[]
    }> {
        const cacheKey = CACHE_KEYS.LIST_USERS(page, size);
        const cached = await this.cacheManager.get<{
            page: number,
            size: number,
            totalElements: number,
            totalPages: number,
            content: UserDTO[]
        }>(cacheKey);

        if (cached) {
            return cached;
        }

        const [users, totalElements] = await this.repository.list(page, size);
        const totalPages = Math.ceil(totalElements / size);
        const response = {
            page,
            size,
            totalElements,
            totalPages,
            content: plainToInstance(UserDTO, users)
        }

        await this.cacheManager.set(cacheKey, response, 10000);
        return response;
    }
}