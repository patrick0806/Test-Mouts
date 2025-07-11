import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { ListUsersService } from '../listUsers.service';
import { UserRepository } from '@/shared/repository/user.repository';
import { CACHE_KEYS } from '@/shared/constants/cacheKeys';

describe('ListUsersService', () => {
  let service: ListUsersService;
  let repository: UserRepository;
  let cacheManager: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListUsersService,
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
            list: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ListUsersService>(ListUsersService);
    repository = module.get<UserRepository>(UserRepository);
    cacheManager = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return cached users if available', async () => {
    const cachedResult = {
      page: 1,
      size: 10,
      totalElements: 2,
      totalPages: 1,
      content: [
        { id: 1, name: 'Cached User 1', email: 'cached1@test.com' },
        { id: 2, name: 'Cached User 2', email: 'cached2@test.com' },
      ],
    };

    const cacheKey = CACHE_KEYS.LIST_USERS(1, 10);

    jest.spyOn(cacheManager, 'get').mockResolvedValueOnce(cachedResult);
    const listSpy = jest.spyOn(repository, 'list');

    const result = await service.execute({ page: 1, size: 10 });

    expect(cacheManager.get).toHaveBeenCalledWith(cacheKey);
    expect(listSpy).not.toHaveBeenCalled();
    expect(result).toEqual(cachedResult);
  });

  it('should list users from database and cache the result when cache is empty', async () => {
    const usersFromDb = [
      { id: 1, name: 'Test User 1', email: 'test1@test.com', password: 'pass' },
      { id: 2, name: 'Test User 2', email: 'test2@test.com', password: 'pass' },
    ];

    const cacheKey = CACHE_KEYS.LIST_USERS(1, 10);

    jest.spyOn(cacheManager, 'get').mockResolvedValueOnce(null);
    jest.spyOn(repository, 'list').mockResolvedValueOnce([usersFromDb, 2]);
    const setCacheSpy = jest.spyOn(cacheManager, 'set');

    const expectedResult = {
      page: 1,
      size: 10,
      totalElements: 2,
      totalPages: 1,
      content: [
        { id: 1, name: 'Test User 1', email: 'test1@test.com' },
        { id: 2, name: 'Test User 2', email: 'test2@test.com' },
      ],
    };

    const result = await service.execute({ page: 1, size: 10 });

    expect(repository.list).toHaveBeenCalledWith(1, 10);
    expect(setCacheSpy).toHaveBeenCalledWith(cacheKey, expectedResult, 300);
    expect(result).toEqual(expectedResult);
  });
});