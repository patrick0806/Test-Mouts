import { UpdateUserRequestDTO } from "./dtos/request.dto";
import { UserDTO } from "@/shared/dto/user.dto";
import { UserRepository } from "@/shared/repository/user.repository";
export declare class UpdateUserService {
    private repository;
    constructor(repository: UserRepository);
    execute(id: number, { name }: UpdateUserRequestDTO): Promise<UserDTO>;
}
