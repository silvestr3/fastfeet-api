import { Recipient } from '@/domain/enterprise/entities/recipient';
import { Prisma, Recipient as PrismaRecipient } from '@prisma/client';

export class PrismaRecipientMapper {
  static toPrisma(recipient: Recipient): PrismaRecipient {
    return {
      id: recipient.id.toString(),
      name: recipient.name,
      address: recipient.address,
      latitude: new Prisma.Decimal(recipient.latitude),
      longitude: new Prisma.Decimal(recipient.longitude),
    };
  }

  static toDomain(recipient: PrismaRecipient): Recipient {
    return Recipient.create({
      name: recipient.name,
      address: recipient.address,
      latitude: Number(recipient.latitude),
      longitude: Number(recipient.longitude),
    });
  }
}
