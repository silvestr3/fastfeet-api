import { HashGenerator } from '../cryptography/hash-generator';
import { UsersRepository } from '../repositories/users-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';

interface EditUserPasswordUseCaseParams {
  executorId: string;
  userId: string;
  password: string;
}

export class EditUserPasswordUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    executorId,
    userId,
    password,
  }: EditUserPasswordUseCaseParams) {
    const executorUser = await this.usersRepository.findById(executorId);

    if (executorUser.role !== 'ADMIN' || !executorUser) {
      throw new UnauthorizedError();
    }

    const userToEdit = await this.usersRepository.findById(userId);

    if (!userToEdit) {
      throw new ResourceNotFoundError();
    }

    userToEdit.password = await this.hashGenerator.hash(password);

    await this.usersRepository.save(userToEdit);

    return {
      userToEdit,
    };
  }
}
