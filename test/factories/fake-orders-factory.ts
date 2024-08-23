import { faker } from '@faker-js/faker';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { Order, OrderProps } from 'src/domain/enterprise/entities/order';

export function MakeOrder(
  override: Partial<OrderProps> = {},
  id?: UniqueEntityId,
) {
  const order = Order.create(
    {
      description: faker.lorem.sentence(10),
      status: 'WAITING',
      recipientId: new UniqueEntityId(),
      ...override,
    },
    id,
  );

  return order;
}
