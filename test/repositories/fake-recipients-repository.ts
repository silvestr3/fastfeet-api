import { RecipientsRepository } from 'src/domain/application/repositories/recipients-repository';
import { Recipient } from 'src/domain/enterprise/entities/recipient';

export class FakeRecipientsRepository implements RecipientsRepository {
  public recipients: Recipient[] = [];

  async create(recipient: Recipient): Promise<void> {
    this.recipients.push(recipient);
  }

  async save(recipient: Recipient): Promise<void> {
    const recipientIndex = this.recipients.findIndex(
      (u) => u.id === recipient.id,
    );

    this.recipients[recipientIndex] = recipient;
  }

  async delete(recipient: Recipient): Promise<void> {
    const recipientIndex = this.recipients.findIndex(
      (u) => u.id === recipient.id,
    );

    this.recipients.splice(recipientIndex, 1);
  }

  async findById(id: string): Promise<Recipient | null> {
    const recipient = this.recipients.find(
      (recipient) => recipient.id.toString() === id,
    );

    return recipient ?? null;
  }
}
