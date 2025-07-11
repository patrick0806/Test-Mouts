import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from '../createUser.service';
import { UserRepository } from '@/shared/repository/user.repository';
import { ConflictException } from '@nestjs/common';

describe('CreateUserService', () => {
  let service: CreateUserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        UserRepository,
        {
          provide: UserRepository,
          useValue: {
            findByEmail: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = {
      name: 'Test User',
      email: 'test@test.com',
      password: 'password',
    };

    jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce(null);
    jest.spyOn(repository, 'save').mockResolvedValueOnce({ ...user, id: 1 });

    const result = await service.execute(user);

    expect(result).toEqual({ id: 1, name: user.name, email: user.email });
  });

  it('should throw a conflict exception if user already exists', async () => {
    const user = {
      name: 'Test User',
      email: 'test@test.com',
      password: 'password',
    };

    jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce({ ...user, id: 1 });

    await expect(service.execute(user)).rejects.toThrow(ConflictException);
  });
});
