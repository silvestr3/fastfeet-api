import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { HashGenerator } from '../cryptography/hash-generator';
import { UsersRepository } from '../repositories/users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { UnauthorizedError } from './errors/unauthorized-error';
import { User } from 'src/domain/enterprise/entities/user';

interface CreateDeliveryUserUseCaseParams {
  userId: UniqueEntityId;
  name: string;
  cpf: string;
  password: string;
}

export class CreateDeliveryUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hasher: HashGenerator,
  ) {}

  async execute({
    userId,
    name,
    cpf,
    password,
  }: CreateDeliveryUserUseCaseParams) {
    const executerUser = await this.usersRepository.findById(userId.toString());

    if (executerUser.role !== 'ADMIN') {
      throw new UnauthorizedError();
    }

    const doesUserAlreadyExist = await this.usersRepository.findByCPF(cpf);

    if (doesUserAlreadyExist) {
      throw new UserAlreadyExistsError();
    }

    const newUser = User.create({
      name,
      cpf,
      password: await this.hasher.hash(password),
      role: 'DELIVERY',
    });

    const user = this.usersRepository.create(newUser);

    return {
      user,
    };
  }
}
