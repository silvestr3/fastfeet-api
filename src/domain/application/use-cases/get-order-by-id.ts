import { OrdersRepository } from '../repositories/orders-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetOrderByIdUseCaseParams {
  id: string;
}

export class GetOrderByIdUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({ id }: GetOrderByIdUseCaseParams) {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new ResourceNotFoundError();
    }

    return {
      order,
    };
  }
}
