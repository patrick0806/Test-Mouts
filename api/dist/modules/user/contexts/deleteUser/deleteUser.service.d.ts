import { UserRepository } from "@/shared/repository/user.repository";
export declare class DeleteUserService {
    private repository;
    constructor(repository: UserRepository);
    execute(id: number): Promise<void>;
}
