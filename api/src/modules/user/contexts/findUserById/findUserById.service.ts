import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserDTO } from "@/shared/dto/user.dto";
import { UserRepository } from "@/shared/repository/user.repository";
import { plainToInstance } from "class-transformer";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { CACHE_KEYS } from "@/shared/constants/cacheKeys";

@Injectable()
export class FindUserByIdService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private repository: UserRepository) { }

    async execute(id: number): Promise<UserDTO> {
        const cacheKey = CACHE_KEYS.FIND_USER_BY_ID(id);
        const cached = await this.cacheManager.get<UserDTO>(cacheKey);

        if (cached) {
            return cached;
        }

        const user = await this.repository.findById(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }
        const userDTO = plainToInstance(UserDTO, user);
        await this.cacheManager.set(cacheKey, userDTO, 10000);

        return userDTO;
    }
}