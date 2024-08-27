import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Recipient } from '@/domain/enterprise/entities/recipient';
import { Prisma, Recipient as PrismaRecipient } from '@prisma/client';

export class PrismaRecipientMapper {
  static toPrisma(recipient: Recipient): PrismaRecipient {
    return {
      id: recipient.id.toString(),
      name: recipient.name,
      address: recipient.address,
      latitude: new Prisma.Decimal(recipient.latitude.toString()),
      longitude: new Prisma.Decimal(recipient.longitude.toString()),
    };
  }

  static toDomain(recipient: PrismaRecipient): Recipient {
    return Recipient.create(
      {
        name: recipient.name,
        address: recipient.address,
        latitude: recipient.latitude.toNumber(),
        longitude: recipient.longitude.toNumber(),
      },
      new UniqueEntityId(recipient.id),
    );
  }
}
