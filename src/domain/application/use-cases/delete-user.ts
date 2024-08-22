import { UsersRepository } from '../repositories/users-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';

interface DeleteUserUseCaseParams {
  executorId: string;
  userId: string;
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ executorId, userId }: DeleteUserUseCaseParams) {
    const executorUser = await this.usersRepository.findById(executorId);

    if (executorUser.role !== 'ADMIN' || !executorUser) {
      throw new UnauthorizedError();
    }

    const userToDelete = await this.usersRepository.findById(userId);

    if (!userToDelete) {
      throw new ResourceNotFoundError();
    }

    await this.usersRepository.delete(userToDelete);

    return null;
  }
}
