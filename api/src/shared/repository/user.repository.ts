import { Injectable } from "@nestjs/common";
import { User } from "@/shared/entities/user.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserRepository {
    private repository: Repository<User>;

    constructor(private datasource: DataSource) {
        this.repository = datasource.getRepository(User);
    }

    async save(user: Partial<User>): Promise<User> {
        return this.repository.save(user);
    }

    async findById(id: number): Promise<User | null> {
        return this.repository.findOneBy({ id });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOneBy({ email });
    }

    async deleteById(id: number): Promise<void> {
        await this.repository.delete({ id });
    }

    async list(page: number, size: number) {
        return this.repository.findAndCount({
            order: { name: 'ASC' },
            skip: size * (page - 1),
            take: size
        });
    }
}