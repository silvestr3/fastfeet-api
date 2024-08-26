import { Order } from '@/domain/enterprise/entities/order';
import { OrdersRepository } from '../repositories/orders-repository';
import { UsersRepository } from '../repositories/users-repository';
import { UnauthorizedError } from './errors/unauthorized-error';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

interface CreateOrderUseCaseParams {
  executorId: string;
  recipientId: string;
  description: string;
}

export class CreateOrderUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({
    executorId,
    recipientId,
    description,
  }: CreateOrderUseCaseParams) {
    const executorUser = await this.usersRepository.findById(executorId);

    if (!executorUser || executorUser.role !== 'ADMIN') {
      throw new UnauthorizedError();
    }

    const newOrder = Order.create({
      recipientId: new UniqueEntityId(recipientId),
      description,
      status: 'NEW',
    });

    await this.ordersRepository.create(newOrder);

    return {
      order: newOrder,
    };
  }
}
