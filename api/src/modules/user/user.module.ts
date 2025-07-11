import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

import { CreateUserController } from './contexts/createUser/createUser.controller';
import { CreateUserService } from './contexts/createUser/createUser.service';
import { DeleteUserController } from './contexts/deleteUser/deleteUser.controller';
import { DeleteUserService } from './contexts/deleteUser/deleteUser.service';
import { FindUserByIdController } from './contexts/findUserById/findUserById.controller';
import { FindUserByIdService } from './contexts/findUserById/findUserById.service';
import { ListUsersController } from './contexts/listUsers/listUsers.controller';
import { ListUsersService } from './contexts/listUsers/listUsers.service';
import { UpdateUserController } from './contexts/updateUser/updateUser.controller';
import { UpdateUserService } from './contexts/updateUser/updateUser.service';
import { CacheModule } from '@nestjs/cache-manager';
import env from '@/config/env';
import { UserRepository } from '@/shared/repository/user.repository';


@Module({
    imports: [
        CacheModule.register({
            store: redisStore,
            host: env().redis.host,
            port: env().redis.port,
            ttl: env().redis.ttl,
        }),
    ],
    controllers: [
        CreateUserController,
        DeleteUserController,
        FindUserByIdController,
        ListUsersController,
        UpdateUserController,
    ],
    providers: [
        CreateUserService,
        DeleteUserService,
        FindUserByIdService,
        ListUsersService,
        UpdateUserService,
        UserRepository,
    ],
})
export class UserModule { }