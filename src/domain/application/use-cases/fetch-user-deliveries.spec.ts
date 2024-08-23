import { FakeOrdersRepository } from 'test/repositories/fake-orders-repository';
import { FakeUsersRepository } from 'test/repositories/fake-users-repository';
import { MarkOrderAsPendingUseCase } from './mark-order-as-pending';
import { FetchUserDeliveriesUseCase } from './fetch-user-deliveries';
import { MakeOrder } from 'test/factories/fake-orders-factory';
import { MakeUser } from 'test/factories/fake-users-factory';

let usersRepository: FakeUsersRepository;
let ordersRepository: FakeOrdersRepository;

let sut: FetchUserDeliveriesUseCase;

describe('Fetch users deliveries use case tests', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    ordersRepository = new FakeOrdersRepository();

    sut = new FetchUserDeliveriesUseCase(usersRepository, ordersRepository);
  });

  it('Should be able to fetch users deliveries', async () => {
    const user = MakeUser();
    usersRepository.users.push(user);

    for (let i = 0; i <= 20; i++) {
      const order = MakeOrder({
        deliveryPersonId: i > 12 ? user.id : undefined,
      });
      ordersRepository.orders.push(order);
    }

    const { orders } = await sut.execute({
      executorId: user.id.toString(),
    });

    expect(orders).toHaveLength(8);
  });
});
