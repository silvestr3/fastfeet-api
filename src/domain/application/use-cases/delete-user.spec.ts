import { FakeHasher } from 'test/cryptography/fake-hasher';
import { FakeUsersRepository } from 'test/repositories/fake-users-repository';
import { MakeUser } from 'test/factories/fake-users-factory';
import { UnauthorizedError } from './errors/unauthorized-error';
import { DeleteUserUseCase } from './delete-user';

let usersRepository: FakeUsersRepository;
let hasher: FakeHasher;
let sut: DeleteUserUseCase;

describe('Create delivery user use case tests', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hasher = new FakeHasher();

    sut = new DeleteUserUseCase(usersRepository);
  });

  it('Should be able to delete a user', async () => {
    const adminUser = MakeUser({
      role: 'ADMIN',
    });

    const user = MakeUser();

    usersRepository.users.push(adminUser);
    usersRepository.users.push(user);

    await sut.execute({
      executorId: adminUser.id.toString(),
      userId: user.id.toString(),
    });

    expect(usersRepository.users[1]).toBeUndefined();
  });

  it('Should not be able to delete a user with non-admin user', async () => {
    const user1 = MakeUser();
    const user2 = MakeUser();

    usersRepository.users.push(user1, user2);

    await expect(
      sut.execute({
        executorId: user1.id.toString(),
        userId: user2.id.toString(),
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
