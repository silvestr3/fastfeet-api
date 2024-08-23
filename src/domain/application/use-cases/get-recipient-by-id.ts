import { RecipientsRepository } from '../repositories/recipients-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetRecipientByIdUseCaseParams {
  id: string;
}

export class GetRecipientByIdUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute({ id }: GetRecipientByIdUseCaseParams) {
    const recipient = await this.recipientsRepository.findById(id);

    if (!recipient) {
      throw new ResourceNotFoundError();
    }

    return {
      recipient,
    };
  }
}
