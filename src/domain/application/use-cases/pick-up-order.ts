import { OrdersRepository } from '../repositories/orders-repository';
import { UsersRepository } from '../repositories/users-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';

interface PickUpOrderUseCaseParams {
  executorId: string;
  orderId: string;
}

export class PickUpOrderUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({ executorId, orderId }: PickUpOrderUseCaseParams) {
    const user = await this.usersRepository.findById(executorId);

    if (!user) {
      throw new UnauthorizedError();
    }

    const order = await this.ordersRepository.findById(orderId);

    if (!order) {
      throw new ResourceNotFoundError();
    }

    order.deliveryPersonId = user.id;
    order.status = 'PICKUP';

    await this.ordersRepository.save(order);

    return {
      order,
    };
  }
}
