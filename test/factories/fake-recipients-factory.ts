import { faker } from '@faker-js/faker';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  Recipient,
  RecipientProps,
} from '@/domain/enterprise/entities/recipient';

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
