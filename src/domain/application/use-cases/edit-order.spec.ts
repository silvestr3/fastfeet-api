import { FakeUsersRepository } from 'test/repositories/fake-users-repository';
import { MakeUser } from 'test/factories/fake-users-factory';
import { UnauthorizedError } from './errors/unauthorized-error';
import { EditOrderUseCase } from './edit-order';
import { FakeOrdersRepository } from 'test/repositories/fake-orders-repository';
import { MakeOrder } from 'test/factories/fake-orders-factory';

let usersRepository: FakeUsersRepository;
let ordersRepository: FakeOrdersRepository;
let sut: EditOrderUseCase;

describe('Create delivery user use case tests', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    ordersRepository = new FakeOrdersRepository();

    sut = new EditOrderUseCase(ordersRepository, usersRepository);
  });

  it("Should be able to edit order's description", async () => {
    const adminUser = MakeUser({
      role: 'ADMIN',
    });

    const order = MakeOrder();
    ordersRepository.orders.push(order);

    usersRepository.users.push(adminUser);

    await sut.execute({
      executorId: adminUser.id.toString(),
      orderId: order.id.toString(),
      description: 'New description',
    });

    expect(ordersRepository.orders[0].description).toEqual('New description');
  });

  it("Should not be able to change user's password with non-user account", async () => {
    const user = MakeUser();
    usersRepository.users.push(user);

    const order = MakeOrder();
    ordersRepository.orders.push(order);

    await expect(
      sut.execute({
        executorId: user.id.toString(),
        orderId: order.id.toString(),
        description: 'New description',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
