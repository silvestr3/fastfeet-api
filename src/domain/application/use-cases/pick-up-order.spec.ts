import { FakeOrdersRepository } from 'test/repositories/fake-orders-repository';
import { FakeUsersRepository } from 'test/repositories/fake-users-repository';
import { PickUpOrderUseCase } from './pick-up-order';
import { MakeUser } from 'test/factories/fake-users-factory';
import { MakeOrder } from 'test/factories/fake-orders-factory';

let usersRepository: FakeUsersRepository;
let ordersRepository: FakeOrdersRepository;

let sut: PickUpOrderUseCase;

describe('Mark order as pending use case tests', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    ordersRepository = new FakeOrdersRepository();

    sut = new PickUpOrderUseCase(usersRepository, ordersRepository);
  });

  it('Should be able to mark order as pending', async () => {
    const user = MakeUser();
    usersRepository.users.push(user);

    const order = MakeOrder();
    ordersRepository.orders.push(order);

    await sut.execute({
      executorId: user.id.toString(),
      orderId: order.id.toString(),
    });

    expect(ordersRepository.orders[0]).toEqual(
      expect.objectContaining({
        id: order.id,
        deliveryPersonId: user.id,
        status: 'PICKUP',
      }),
    );
  });
});
