import { faker } from '@faker-js/faker';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { User, UserProps } from 'src/domain/enterprise/entities/user';

export function MakeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityId,
) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      cpf: faker.string.numeric(11),
      password: faker.internet.password(),
      role: 'DELIVERY',
      ...override,
    },
    id,
  );

  return user;
}
