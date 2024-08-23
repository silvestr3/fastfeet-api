import { OrdersRepository } from 'src/domain/application/repositories/orders-repository';
import { Order } from 'src/domain/enterprise/entities/order';

export class FakeOrdersRepository implements OrdersRepository {
  public orders: Order[] = [];

  async create(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async save(order: Order): Promise<void> {
    const orderIndex = this.orders.findIndex((u) => u.id === order.id);

    this.orders[orderIndex] = order;
  }

  async delete(order: Order): Promise<void> {
    const orderIndex = this.orders.findIndex((u) => u.id === order.id);

    this.orders.splice(orderIndex, 1);
  }

  async findById(id: string): Promise<Order | null> {
    const order = this.orders.find((order) => order.id.toString() === id);

    return order ?? null;
  }
}
