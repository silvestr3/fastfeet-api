import { Recipient } from 'src/domain/enterprise/entities/recipient';

export abstract class RecipientsRepository {
  abstract create(recipient: Recipient): Promise<void>;
  abstract save(recipient: Recipient): Promise<void>;
  abstract delete(recipient: Recipient): Promise<void>;
  abstract findById(id: string): Promise<Recipient | null>;
}
