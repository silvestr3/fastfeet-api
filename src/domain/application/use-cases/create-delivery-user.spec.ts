import { FakeHasher } from 'test/cryptography/fake-hasher';
import { FakeUsersRepository } from 'test/repositories/fake-users-repository';
import { CreateDeliveryUserUseCase } from './create-delivery-user';
import { MakeUser } from 'test/factories/fake-users-factory';
import { UnauthorizedError } from './errors/unauthorized-error';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

let usersRepository: FakeUsersRepository;
let hasher: FakeHasher;
let sut: CreateDeliveryUserUseCase;

describe('Create delivery user use case tests', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hasher = new FakeHasher();

    sut = new CreateDeliveryUserUseCase(usersRepository, hasher);
  });

  it('Should be able to create a new delivery user', async () => {
    const adminUser = MakeUser({
      role: 'ADMIN',
    });

    usersRepository.users.push(adminUser);

    await sut.execute({
      userId: adminUser.id,
      name: 'John Doe',
      cpf: '123123123',
      password: 'testpass',
    });

    expect(usersRepository.users[1]).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        role: 'DELIVERY',
      }),
    );
  });

  it('Should not be able to create a delivery user with non-admin account', async () => {
    const nonAdminUser = MakeUser();
    usersRepository.users.push(nonAdminUser);

    await expect(
      sut.execute({
        userId: nonAdminUser.id,
        name: 'John Doe',
        cpf: '123123123',
        password: 'testpass',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('Should not be able to create a delivery user with existing CPF', async () => {
    const adminUser = MakeUser({
      role: 'ADMIN',
      cpf: '123123123',
    });

    usersRepository.users.push(adminUser);

    await expect(
      sut.execute({
        userId: adminUser.id,
        name: 'John Doe',
        cpf: '123123123',
        password: 'testpass',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
