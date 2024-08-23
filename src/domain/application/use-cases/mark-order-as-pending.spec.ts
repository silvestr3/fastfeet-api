import { FakeUsersRepository } from 'test/repositories/fake-users-repository';
import { FakeOrdersRepository } from 'test/repositories/fake-orders-repository';
import { MarkOrderAsPendingUseCase } from './mark-order-as-pending';
import { MakeUser } from 'test/factories/fake-users-factory';
import { MakeOrder } from 'test/factories/fake-orders-factory';
import { UnauthorizedError } from './errors/unauthorized-error';

let usersRepository: FakeUsersRepository;
let ordersRepository: FakeOrdersRepository;

let sut: MarkOrderAsPendingUseCase;

describe('Mark order as pending use case tests', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    ordersRepository = new FakeOrdersRepository();

    sut = new MarkOrderAsPendingUseCase(usersRepository, ordersRepository);
  });

  it("Should be able to mark an order as 'PENDING'", async () => {
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

    expect(ordersRepository.orders[0].status).toEqual('PENDING');
  });

  it("Should not be able to change to mark an order as 'PENDING' as non-admin user", async () => {
    const user = MakeUser();
    const order = MakeOrder();

    usersRepository.users.push(user);
    ordersRepository.orders.push(order);

    await expect(
      sut.execute({
        executorId: user.id.toString(),
        orderId: order.id.toString(),
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
