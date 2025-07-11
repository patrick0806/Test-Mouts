import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { User } from '@/shared/entities/user.entity';
import { UserRepository } from '@/shared/repository/user.repository';
import { compareHash } from '@/shared/utils/hash.util';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super();
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException({
        error: 'Unauthorized',
        message: 'Invalid credentials, check your email and password',
      });
    }

    const isValidPassword = await compareHash(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException({
        error: 'Unauthorized',
        message: 'Invalid credentials, check your email and password',
      });
    }

    return user;
  }
}