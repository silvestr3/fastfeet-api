import { RecipientsRepository } from '@/domain/application/repositories/recipients-repository';
import { Recipient } from '@/domain/enterprise/entities/recipient';
import { PrismaService } from '../prisma.service';
import { PrismaRecipientMapper } from '../mappers/prisma-recipient-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaRecipientsRepository implements RecipientsRepository {
  constructor(private prisma: PrismaService) {}

  async create(recipient: Recipient): Promise<void> {
    const data = PrismaRecipientMapper.toPrisma(recipient);

    await this.prisma.recipient.create({
      data,
    });
  }

  async save(recipient: Recipient): Promise<void> {
    const data = PrismaRecipientMapper.toPrisma(recipient);

    await this.prisma.recipient.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  async findById(id: string): Promise<Recipient | null> {
    const recipient = await this.prisma.recipient.findUnique({
      where: {
        id,
      },
    });

    if (!recipient) return null;

    return PrismaRecipientMapper.toDomain(recipient);
  }

  async delete(recipient: Recipient): Promise<void> {
    await this.prisma.recipient.delete({
      where: {
        id: recipient.id.toString(),
      },
    });
  }
}
