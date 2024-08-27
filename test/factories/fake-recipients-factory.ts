import { faker } from '@faker-js/faker';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  Recipient,
  RecipientProps,
} from '@/domain/enterprise/entities/recipient';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';
import { PrismaRecipientMapper } from '@/infra/database/mappers/prisma-recipient-mapper';

export function MakeRecipient(
  override: Partial<RecipientProps> = {},
  id?: UniqueEntityId,
) {
  const recipient = Recipient.create(
    {
      name: faker.person.fullName(),
      address: faker.location.streetAddress(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      ...override,
    },
    id,
  );

  return recipient;
}

@Injectable()
export class RecipientFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaRecipient(
    data: Partial<RecipientProps> = {},
  ): Promise<Recipient> {
    const recipient = MakeRecipient(data);

    await this.prisma.recipient.create({
      data: PrismaRecipientMapper.toPrisma(recipient),
    });

    return recipient;
  }
}
