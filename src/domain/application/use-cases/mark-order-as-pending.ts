import { OrdersRepository } from '../repositories/orders-repository';
import { UsersRepository } from '../repositories/users-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';

interface MarkOrderAsPendingUseCaseParams {
  executorId: string;
  orderId: string;
}

export class MarkOrderAsPendingUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({ executorId, orderId }: MarkOrderAsPendingUseCaseParams) {
    const executorUser = await this.usersRepository.findById(executorId);

    if (!executorUser || executorUser.role !== 'ADMIN') {
      throw new UnauthorizedError();
    }

    const orderToChangeStatus = await this.ordersRepository.findById(orderId);

    if (!orderToChangeStatus) {
      throw new ResourceNotFoundError();
    }

    orderToChangeStatus.status = 'PENDING';

    await this.ordersRepository.save(orderToChangeStatus);

    return {
      order: orderToChangeStatus,
    };
  }
}
