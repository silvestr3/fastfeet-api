import { Entity } from 'src/core/entities/entity';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

export interface OrderProps {
  recipientId: UniqueEntityId;
  deliveryPersonId?: UniqueEntityId | null;
  description: string;
  status: 'NEW' | 'PENDING' | 'PICKUP' | 'DELIVERED';
  createdAt?: Date;
  updatedAt?: Date | null;
  deliveryProof?: string | null;
}

export class Order extends Entity<OrderProps> {
  get recipientId() {
    return this.props.recipientId;
  }

  get description() {
    return this.props.description;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get deliveryProof() {
    return this.props.deliveryProof;
  }

  get deliveryPersonId() {
    return this.props.deliveryPersonId;
  }

  set description(description: string) {
    this.props.description = description;
  }

  set deliveryPersonId(deliveryPersonId: UniqueEntityId) {
    this.props.deliveryPersonId = deliveryPersonId;
  }

  set status(status: 'NEW' | 'PENDING' | 'PICKUP' | 'DELIVERED') {
    this.props.status = status;
    this.props.updatedAt = new Date();
  }

  set deliveryProof(deliveryProof: string) {
    this.props.deliveryProof = deliveryProof;
  }

  static create(props: OrderProps, id?: UniqueEntityId) {
    return new Order(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );
  }
}
