import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '../../../core/entities/unique-entity-id';

export interface UserProps {
  name: string;
  cpf: string;
  password: string;
  role: 'ADMIN' | 'DELIVERY';
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get cpf() {
    return this.props.cpf;
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  get role() {
    return this.props.role;
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  static create(props: UserProps, id?: UniqueEntityId) {
    return new User(props, id);
  }
}
