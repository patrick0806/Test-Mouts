import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserRequestDTO } from "./dtos/request.dto";
import { UserDTO } from "@/shared/dto/user.dto";
import { UserRepository } from "@/shared/repository/user.repository";
import { generateHash } from "@/shared/utils/hash.util";
import { plainToInstance } from "class-transformer";

@Injectable()
export class CreateUserService {
    constructor(private repository: UserRepository) { }

    async execute({ email, password, name }: CreateUserRequestDTO): Promise<UserDTO> {
        const alreayExists = await this.repository.findByEmail(email);
        if (alreayExists) {
            throw new ConflictException("Already exits a user with this email");
        }

        const hash = generateHash(password);
        const user = await this.repository.save({
            name,
            email,
            password: hash
        });

        return plainToInstance(UserDTO, user);
    }
}