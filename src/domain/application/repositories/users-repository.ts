import { User } from 'src/domain/enterprise/entities/user';

export abstract class UsersRepository {
  abstract findByCPF(cpf: string): Promise<User | null>;
}
