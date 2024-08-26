import { faker } from '@faker-js/faker';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { User, UserProps } from '@/domain/enterprise/entities/user';
import { PrismaService } from '@/infra/database/prisma.service';
import { PrismaUserMapper } from '@/infra/database/mappers/prisma-user-mapper';
import { Injectable } from '@nestjs/common';
import { HashGenerator } from '@/domain/application/cryptography/hash-generator';

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

@Injectable()
export class UserFactory {
  constructor(
    private prisma: PrismaService,
    private hashGenerator: HashGenerator,
  ) {}

  async makePrismaUser(data: Partial<UserProps> = {}): Promise<User> {
    const user = MakeUser(data);
    user.password = await this.hashGenerator.hash(user.password);

    await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(user),
    });

    return user;
  }
}
