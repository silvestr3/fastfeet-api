import { FakeUsersRepository } from 'test/repositories/fake-users-repository';
import { CreateDeliveryUserUseCase } from './create-delivery-user';
import { GetUserByIdUseCase } from './get-user-by-id';
import { MakeUser } from 'test/factories/fake-users-factory';

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

  it('Should return null when user does not exist', async () => {
    const result = await sut.execute({
      id: '123',
    });

    expect(result.user).toBeNull();
  });
});
