import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByIdService } from '../findUserById.service';
import { UserRepository } from '@/shared/repository/user.repository';
import { NotFoundException } from '@nestjs/common';

describe('FindUserByIdService', () => {
  let service: FindUserByIdService;
  let repository: UserRepository;
  let cacheManager: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByIdService,
        UserRepository,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FindUserByIdService>(FindUserByIdService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return cached user if available', async () => {
    const cachedUser = {
      id: 1,
      name: 'Cached User',
      email: 'cached@test.com'
    };

    cacheManager = service['cacheManager'];
    jest.spyOn(cacheManager, 'get').mockResolvedValueOnce(cachedUser);
    const findByIdSpy = jest.spyOn(repository, 'findById');

    const result = await service.execute(1);

    expect(result).toEqual(cachedUser);
    expect(findByIdSpy).not.toHaveBeenCalled();
  });

  it('should find a user by id from database when cache is empty', async () => {
    const user = {
      id: 1,
      name: 'Test User',
      email: 'test@test.com',
      password: 'password',
    };

    jest.spyOn(repository, 'findById').mockResolvedValueOnce(user);

    cacheManager = service['cacheManager'];
    jest.spyOn(cacheManager, 'get').mockResolvedValueOnce(null);
    const setCacheSpy = jest.spyOn(cacheManager, 'set');

    const result = await service.execute(1);
    const expectedResult = { id: 1, name: 'Test User', email: 'test@test.com' };

    expect(result).toEqual(expectedResult);
    expect(setCacheSpy).toHaveBeenCalledWith(
      'users:1',
      expectedResult,
      300
    );
  });

  it('should throw a not found exception if user does not exist', async () => {
    jest.spyOn(repository, 'findById').mockResolvedValueOnce(null);

    await expect(service.execute(1)).rejects.toThrow(NotFoundException);
  });
});
