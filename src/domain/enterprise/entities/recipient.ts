import { Entity } from 'src/core/entities/entity';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

export interface RecipientProps {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export class Recipient extends Entity<RecipientProps> {
  get name() {
    return this.props.name;
  }

  get address() {
    return this.props.address;
  }

  get latitude() {
    return this.props.latitude;
  }

  get longitude() {
    return this.props.longitude;
  }

  set name(name: string) {
    this.props.name = name;
  }

  set address(address: string) {
    this.props.address = address;
  }

  set latitude(latitude: number) {
    this.props.latitude = latitude;
  }

  set longitude(longitude: number) {
    this.props.longitude = longitude;
  }

  static create(props: RecipientProps, id?: UniqueEntityId) {
    return new Recipient(props, id);
  }
}
