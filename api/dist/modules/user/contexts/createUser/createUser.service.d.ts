import { CreateUserRequestDTO } from "./dtos/request.dto";
import { UserDTO } from "@/shared/dto/user.dto";
import { UserRepository } from "@/shared/repository/user.repository";
export declare class CreateUserService {
    private repository;
    constructor(repository: UserRepository);
    execute({ email, password, name }: CreateUserRequestDTO): Promise<UserDTO>;
}
