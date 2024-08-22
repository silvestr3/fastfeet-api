import { UsersRepository } from 'src/domain/application/repositories/users-repository';
import { User } from 'src/domain/enterprise/entities/user';

export class FakeUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async save(user: User): Promise<void> {
    const userIndex = this.users.findIndex((u) => u.id === user.id);

    this.users[userIndex] = user;
  }

  async delete(user: User): Promise<void> {
    const userIndex = this.users.findIndex((u) => u.id === user.id);

    this.users.splice(userIndex, 1);
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id.toString() === id);

    return user ?? null;
  }

  async findByCPF(cpf: string): Promise<User | null> {
    const user = this.users.find((user) => user.cpf === cpf);

    return user ?? null;
  }
}
