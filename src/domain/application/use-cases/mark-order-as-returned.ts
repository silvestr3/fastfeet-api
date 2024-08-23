import { OrdersRepository } from '../repositories/orders-repository';
import { UsersRepository } from '../repositories/users-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';

interface MarkOrderAsReturnedUseCaseParams {
  executorId: string;
  orderId: string;
}

export class MarkOrderAsReturnedUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({ executorId, orderId }: MarkOrderAsReturnedUseCaseParams) {
    const executorUser = await this.usersRepository.findById(executorId);

    if (!executorUser) {
      throw new UnauthorizedError();
    }

    const orderToChangeStatus = await this.ordersRepository.findById(orderId);

    if (!orderToChangeStatus) {
      throw new ResourceNotFoundError();
    }

    if (orderToChangeStatus.deliveryPersonId !== executorUser.id) {
      throw new UnauthorizedError();
    }

    orderToChangeStatus.status = 'RETURNED';

    await this.ordersRepository.save(orderToChangeStatus);

    return {
      order: orderToChangeStatus,
    };
  }
}
