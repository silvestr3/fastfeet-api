import { FakeOrdersRepository } from 'test/repositories/fake-orders-repository';
import { GetOrderByIdUseCase } from './get-order-by-id';
import { MakeOrder } from 'test/factories/fake-orders-factory';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let ordersRepository: FakeOrdersRepository;
let sut: GetOrderByIdUseCase;

describe('Get order by id use case tests', () => {
  beforeEach(() => {
    ordersRepository = new FakeOrdersRepository();
    sut = new GetOrderByIdUseCase(ordersRepository);
  });

  it('Should be able to return a order by its id', async () => {
    const order = MakeOrder();
    ordersRepository.orders.push(order);

    const result = await sut.execute({
      id: order.id.toString(),
    });

    expect(result.order).toEqual(order);
  });

  it('Should throw when order is not found', async () => {
    await expect(
      sut.execute({
        id: '123',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
