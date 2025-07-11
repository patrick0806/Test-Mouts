import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateUserRequestDTO } from "./dtos/request.dto";
import { UserDTO } from "@/shared/dto/user.dto";
import { UserRepository } from "@/shared/repository/user.repository";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UpdateUserService {
    constructor(private repository: UserRepository) { }

    async execute(id: number, { name }: UpdateUserRequestDTO): Promise<UserDTO> {
        const user = await this.repository.findById(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        user.name = name;

        const updatedUser = await this.repository.save(user);

        return plainToInstance(UserDTO, updatedUser);
    }
}