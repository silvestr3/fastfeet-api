import { FakeHasher } from 'test/cryptography/fake-hasher';
import { FakeUsersRepository } from 'test/repositories/fake-users-repository';
import { EditUserPasswordUseCase } from './edit-user-password';
import { MakeUser } from 'test/factories/fake-users-factory';
import { UnauthorizedError } from './errors/unauthorized-error';

let usersRepository: FakeUsersRepository;
let hasher: FakeHasher;
let sut: EditUserPasswordUseCase;

describe('Edit users password use case tests', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hasher = new FakeHasher();

    sut = new EditUserPasswordUseCase(usersRepository, hasher);
  });

  it("Should be able to modify user's password", async () => {
    const adminUser = MakeUser({
      role: 'ADMIN',
    });

    const user = MakeUser({
      password: '123456',
    });

    usersRepository.users.push(adminUser);
    usersRepository.users.push(user);

    await sut.execute({
      executorId: adminUser.id.toString(),
      userId: user.id.toString(),
      password: 'changedpassword',
    });

    const compareNewPassword = await hasher.compare(
      'changedpassword',
      usersRepository.users[1].password,
    );

    expect(compareNewPassword).toBe(true);
  });

  it("Should not be able to change user's password with non-user account", async () => {
    const user = MakeUser();
    usersRepository.users.push(user);

    await expect(
      sut.execute({
        executorId: user.id.toString(),
        userId: user.id.toString(),
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
