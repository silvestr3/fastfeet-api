import { RecipientsRepository } from '../repositories/recipients-repository';
import { UsersRepository } from '../repositories/users-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';

interface DeleteRecipientUseCaseParams {
  executorId: string;
  recipientId: string;
}

export class DeleteRecipientUseCase {
  constructor(
    private recipientsRepository: RecipientsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ executorId, recipientId }: DeleteRecipientUseCaseParams) {
    const executorUser = await this.usersRepository.findById(executorId);

    if (executorUser.role !== 'ADMIN' || !executorUser) {
      throw new UnauthorizedError();
    }

    const recipientToDelete =
      await this.recipientsRepository.findById(recipientId);

    if (!recipientToDelete) {
      throw new ResourceNotFoundError();
    }

    await this.recipientsRepository.delete(recipientToDelete);

    return null;
  }
}
