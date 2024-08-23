import { FakeHasher } from 'test/cryptography/fake-hasher';
import { FakeUsersRepository } from 'test/repositories/fake-users-repository';
import { MakeUser } from 'test/factories/fake-users-factory';
import { UnauthorizedError } from './errors/unauthorized-error';
import { DeleteUserUseCase } from './delete-user';
import { DeleteOrderUseCase } from './delete-order';
import { FakeOrdersRepository } from 'test/repositories/fake-orders-repository';
import { MakeOrder } from 'test/factories/fake-orders-factory';

let usersRepository: FakeUsersRepository;
let ordersRepository: FakeOrdersRepository;
let sut: DeleteOrderUseCase;

describe('Create delivery user use case tests', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    ordersRepository = new FakeOrdersRepository();
    sut = new DeleteOrderUseCase(ordersRepository, usersRepository);
  });

  it('Should be able to delete an order', async () => {
    const adminUser = MakeUser({
      role: 'ADMIN',
    });

    const order = MakeOrder();

    usersRepository.users.push(adminUser);
    ordersRepository.orders.push(order);

    await sut.execute({
      executorId: adminUser.id.toString(),
      orderId: order.id.toString(),
    });

    expect(ordersRepository.orders[0]).toBeUndefined();
  });

  it('Should not be able to delete a user with non-admin user', async () => {
    const user1 = MakeUser();
    const order = MakeOrder();

    usersRepository.users.push(user1);
    ordersRepository.orders.push(order);

    await expect(
      sut.execute({
        executorId: user1.id.toString(),
        orderId: order.id.toString(),
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
