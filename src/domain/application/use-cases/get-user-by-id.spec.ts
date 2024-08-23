import { FakeUsersRepository } from 'test/repositories/fake-users-repository';
import { GetUserByIdUseCase } from './get-user-by-id';
import { MakeUser } from 'test/factories/fake-users-factory';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let usersRepository: FakeUsersRepository;
let sut: GetUserByIdUseCase;

describe('Get user by id use case tests', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    sut = new GetUserByIdUseCase(usersRepository);
  });

  it('Should be able to return a user by its id', async () => {
    const user = MakeUser({
      name: 'John Doe',
    });
    usersRepository.users.push(user);

    const result = await sut.execute({
      id: user.id.toString(),
    });

    expect(result.user).toEqual(user);
  });

  it('Should throw when user is not found', async () => {
    await expect(
      sut.execute({
        id: '123',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
