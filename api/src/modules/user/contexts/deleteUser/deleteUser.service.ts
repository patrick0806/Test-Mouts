import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "@/shared/repository/user.repository";

@Injectable()
export class DeleteUserService {
    constructor(private repository: UserRepository) { }

    async execute(id: number): Promise<void> {
        const user = await this.repository.findById(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.repository.deleteById(id);
    }
}