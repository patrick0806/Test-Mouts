import { User } from "@/shared/entities/user.entity";
import { DataSource } from "typeorm";
export declare class UserRepository {
    private datasource;
    private repository;
    constructor(datasource: DataSource);
    save(user: Partial<User>): Promise<User>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    deleteById(id: number): Promise<void>;
    list(page: number, size: number): unknown;
}
