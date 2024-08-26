import { HashGenerator } from '../cryptography/hash-generator';
import { UsersRepository } from '../repositories/users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { UnauthorizedError } from './errors/unauthorized-error';
import { User } from '@/domain/enterprise/entities/user';
import { Injectable } from '@nestjs/common';

interface CreateDeliveryUserUseCaseParams {
  executorId: string;
  name: string;
  cpf: string;
  password: string;
}
@Injectable()
export class CreateDeliveryUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hasher: HashGenerator,
  ) {}

  async execute({
    executorId,
    name,
    cpf,
    password,
  }: CreateDeliveryUserUseCaseParams) {
    const executerUser = await this.usersRepository.findById(
      executorId.toString(),
    );

    if (executerUser.role !== 'ADMIN' || !executerUser) {
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

    await this.usersRepository.create(newUser);

    return {
      user: newUser,
    };
  }
}
