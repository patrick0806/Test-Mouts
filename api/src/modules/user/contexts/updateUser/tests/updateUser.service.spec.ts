import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserService } from '../updateUser.service';
import { UserRepository } from '@/shared/repository/user.repository';
import { NotFoundException } from '@nestjs/common';

describe('UpdateUserService', () => {
  let service: UpdateUserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        UserRepository,
        {
          provide: UserRepository,
          useValue: {
            findById: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateUserService>(UpdateUserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a user', async () => {
    const user = {
      name: 'Test User',
    };

    jest.spyOn(repository, 'findById').mockResolvedValueOnce({ id: 1, name: 'Old Name', email: 'test@test.com', password: 'password' });
    jest.spyOn(repository, 'save').mockResolvedValueOnce({ id: 1, name: 'Test User', email: 'test@test.com', password: 'password' });

    const result = await service.execute(1, user);

    expect(result).toEqual({ id: 1, name: 'Test User', email: 'test@test.com' });
  });

  it('should throw a not found exception if user does not exist', async () => {
    const user = {
      name: 'Test User',
    };

    jest.spyOn(repository, 'findById').mockResolvedValueOnce(null);

    await expect(service.execute(1, user)).rejects.toThrow(NotFoundException);
  });
});
