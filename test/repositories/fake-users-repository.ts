import { UsersRepository } from 'src/domain/application/repositories/users-repository';
import { User } from 'src/domain/enterprise/entities/user';

export class FakeUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id.toString() === id);

    return user;
  }

  async findByCPF(cpf: string): Promise<User | null> {
    const user = this.users.find((user) => user.cpf === cpf);

    return user;
  }
}
