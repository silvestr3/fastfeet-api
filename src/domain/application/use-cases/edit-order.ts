import { OrdersRepository } from '../repositories/orders-repository';
import { UsersRepository } from '../repositories/users-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';

interface EditOrderUseCaseParams {
  executorId: string;
  orderId: string;
  description: string;
}

export class EditOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ executorId, orderId, description }: EditOrderUseCaseParams) {
    const executorUser = await this.usersRepository.findById(executorId);

    if (executorUser.role !== 'ADMIN' || !executorUser) {
      throw new UnauthorizedError();
    }

    const orderToEdit = await this.ordersRepository.findById(orderId);

    if (!orderToEdit) {
      throw new ResourceNotFoundError();
    }

    orderToEdit.description = description;

    await this.ordersRepository.save(orderToEdit);

    return {
      orderToEdit,
    };
  }
}
