import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUserService } from '../deleteUser.service';
import { UserRepository } from '@/shared/repository/user.repository';
import { NotFoundException } from '@nestjs/common';

describe('DeleteUserService', () => {
  let service: DeleteUserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserService,
        UserRepository,
        {
          provide: UserRepository,
          useValue: {
            findById: jest.fn(),
            deleteById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DeleteUserService>(DeleteUserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delete a user', async () => {
    jest.spyOn(repository, 'findById').mockResolvedValueOnce({ id: 1, name: 'Test User', email: 'test@test.com', password: 'password' });
    jest.spyOn(repository, 'deleteById').mockResolvedValueOnce(undefined);

    await service.execute(1);

    expect(repository.deleteById).toHaveBeenCalledWith(1);
  });

  it('should throw a not found exception if user does not exist', async () => {
    jest.spyOn(repository, 'findById').mockResolvedValueOnce(null);

    await expect(service.execute(1)).rejects.toThrow(NotFoundException);
  });
});
