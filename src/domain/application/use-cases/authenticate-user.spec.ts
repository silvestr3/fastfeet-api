import { FakeHasher } from 'test/cryptography/fake-hasher';
import { FakeUsersRepository } from 'test/repositories/fake-users-repository';
import { AuthenticateUserUseCase } from './authenticate-user';
import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { User } from '@/domain/enterprise/entities/user';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let usersRepository: FakeUsersRepository;
let hasher: FakeHasher;
let encrypter: FakeEncrypter;
let sut: AuthenticateUserUseCase;

describe('Authenticate user use case tests', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hasher = new FakeHasher();
    encrypter = new FakeEncrypter();

    sut = new AuthenticateUserUseCase(usersRepository, hasher, encrypter);
  });

  it('Should be able to authenticate a user', async () => {
    const user = User.create({
      cpf: '123123123',
      name: 'John Doe',
      password: await hasher.hash('123456'),
      role: 'DELIVERY',
    });

    await usersRepository.users.push(user);

    const result = await sut.execute({
      cpf: '123123123',
      password: '123456',
    });

    expect(result).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    );
  });

  it('Should not be able to authenticate a user with wrong credentials', async () => {
    const user = User.create({
      cpf: '123123123',
      name: 'John Doe',
      password: await hasher.hash('123456'),
      role: 'DELIVERY',
    });

    await usersRepository.users.push(user);

    await expect(
      sut.execute({
        cpf: '123123123',
        password: 'incorrect',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
