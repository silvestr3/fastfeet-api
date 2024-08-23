import { OrdersRepository } from '../repositories/orders-repository';
import { UsersRepository } from '../repositories/users-repository';
import { UnauthorizedError } from './errors/unauthorized-error';

interface FetchUserDeliveriesUseCaseParams {
  executorId: string;
}

export class FetchUserDeliveriesUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({ executorId }: FetchUserDeliveriesUseCaseParams) {
    const user = await this.usersRepository.findById(executorId);

    if (!user) {
      throw new UnauthorizedError();
    }

    const userOrders = await this.ordersRepository.fetchByUserId(executorId);

    return {
      orders: userOrders,
    };
  }
}
