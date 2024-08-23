import { FakeUsersRepository } from 'test/repositories/fake-users-repository';
import { MakeUser } from 'test/factories/fake-users-factory';
import { UnauthorizedError } from './errors/unauthorized-error';
import { CreateOrderUseCase } from './create-order';
import { FakeOrdersRepository } from 'test/repositories/fake-orders-repository';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

let usersRepository: FakeUsersRepository;
let ordersRepository: FakeOrdersRepository;
let sut: CreateOrderUseCase;

describe('Create order use case tests', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    ordersRepository = new FakeOrdersRepository();

    sut = new CreateOrderUseCase(usersRepository, ordersRepository);
  });

  it('Should be able to create a new order', async () => {
    const adminUser = MakeUser({
      role: 'ADMIN',
    });

    usersRepository.users.push(adminUser);

    await sut.execute({
      executorId: adminUser.id.toString(),
      description: 'Test order',
      recipientId: 'recipient-01',
    });

    expect(ordersRepository.orders[0]).toEqual(
      expect.objectContaining({
        description: 'Test order',
        recipientId: new UniqueEntityId('recipient-01'),
        status: 'WAITING',
      }),
    );
  });

  it('Should not be able to create an order with non-admin account', async () => {
    const nonAdminUser = MakeUser();
    usersRepository.users.push(nonAdminUser);

    await expect(
      sut.execute({
        executorId: nonAdminUser.id.toString(),
        description: 'Test order',
        recipientId: 'recipient-01',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
