import { FakeUsersRepository } from 'test/repositories/fake-users-repository';
import { FakeOrdersRepository } from 'test/repositories/fake-orders-repository';
import { MakeUser } from 'test/factories/fake-users-factory';
import { MakeOrder } from 'test/factories/fake-orders-factory';
import { UnauthorizedError } from './errors/unauthorized-error';
import { MarkOrderAsReturnedUseCase } from './mark-order-as-returned';

let usersRepository: FakeUsersRepository;
let ordersRepository: FakeOrdersRepository;

let sut: MarkOrderAsReturnedUseCase;

describe('Mark order as returned use case tests', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    ordersRepository = new FakeOrdersRepository();

    sut = new MarkOrderAsReturnedUseCase(usersRepository, ordersRepository);
  });

  it("Should be able to mark an order as 'RETURNED'", async () => {
    const user = MakeUser();

    const order = MakeOrder({
      deliveryPersonId: user.id,
    });

    usersRepository.users.push(user);
    ordersRepository.orders.push(order);

    await sut.execute({
      executorId: user.id.toString(),
      orderId: order.id.toString(),
    });

    expect(ordersRepository.orders[0].status).toEqual('RETURNED');
  });

  it('Should not be able to change to mark another users order as RETURNED', async () => {
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
