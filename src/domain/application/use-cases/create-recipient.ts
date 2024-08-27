import { Recipient } from '@/domain/enterprise/entities/recipient';
import { RecipientsRepository } from '../repositories/recipients-repository';
import { UsersRepository } from '../repositories/users-repository';
import { UnauthorizedError } from './errors/unauthorized-error';
import { Injectable } from '@nestjs/common';

interface CreateRecipientUseCaseParams {
  executorId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}
@Injectable()
export class CreateRecipientUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private recipientsRepository: RecipientsRepository,
  ) {}

  async execute({
    executorId,
    name,
    address,
    latitude,
    longitude,
  }: CreateRecipientUseCaseParams) {
    const executorUser = await this.usersRepository.findById(executorId);

    if (!executorUser || executorUser.role !== 'ADMIN') {
      throw new UnauthorizedError();
    }

    const newRecipient = Recipient.create({
      name,
      address,
      latitude,
      longitude,
    });

    await this.recipientsRepository.create(newRecipient);

    return {
      recipient: newRecipient,
    };
  }
}
