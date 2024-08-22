import { UsersRepository } from 'src/domain/application/repositories/users-repository';
import { User } from 'src/domain/enterprise/entities/user';

export class FakeUsersRepository implements UsersRepository {
  public users: User[] = [];

  async findByCPF(cpf: string): Promise<User | null> {
    const user = this.users.find((user) => user.cpf === cpf);

    return user;
  }
}
