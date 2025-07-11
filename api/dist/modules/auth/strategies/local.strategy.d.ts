import { User } from '@/shared/entities/user.entity';
import { UserRepository } from '@/shared/repository/user.repository';
declare const LocalStrategy_base: any;
export declare class LocalStrategy extends LocalStrategy_base {
    private userRepository;
    constructor(userRepository: UserRepository);
    validate(email: string, password: string): Promise<User>;
}
export {};
