import { OrdersRepository } from '../repositories/orders-repository';
import { UsersRepository } from '../repositories/users-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';

interface DeleteOrderUseCaseParams {
  executorId: string;
  orderId: string;
}

export class DeleteOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ executorId, orderId }: DeleteOrderUseCaseParams) {
    const executorUser = await this.usersRepository.findById(executorId);

    if (executorUser.role !== 'ADMIN' || !executorUser) {
      throw new UnauthorizedError();
    }

    const orderToDelete = await this.ordersRepository.findById(orderId);

    if (!orderToDelete) {
      throw new ResourceNotFoundError();
    }

    await this.ordersRepository.delete(orderToDelete);

    return null;
  }
}
