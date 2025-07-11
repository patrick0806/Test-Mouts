import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { dataSource } from './config/typeorm/dataSource';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource.options),
    AuthModule,
    UserModule,
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule
      },
      {
        path: 'users',
        module: UserModule,
      }
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JWTAuthGuard,
    },
  ],
})
export class AppModule { }
