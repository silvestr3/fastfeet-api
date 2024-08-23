import { RecipientsRepository } from '../repositories/recipients-repository';
import { UsersRepository } from '../repositories/users-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UnauthorizedError } from './errors/unauthorized-error';

interface EditRecipientUseCaseParams {
  executorId: string;
  recipientId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export class EditRecipientUseCase {
  constructor(
    private recipientsRepository: RecipientsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    executorId,
    recipientId,
    name,
    address,
    latitude,
    longitude,
  }: EditRecipientUseCaseParams) {
    const executorUser = await this.usersRepository.findById(executorId);

    if (executorUser.role !== 'ADMIN' || !executorUser) {
      throw new UnauthorizedError();
    }

    const recipientToEdit =
      await this.recipientsRepository.findById(recipientId);

    if (!recipientToEdit) {
      throw new ResourceNotFoundError();
    }

    recipientToEdit.name = name;
    recipientToEdit.address = address;
    recipientToEdit.latitude = latitude;
    recipientToEdit.longitude = longitude;

    await this.recipientsRepository.save(recipientToEdit);

    return {
      recipientToEdit,
    };
  }
}
