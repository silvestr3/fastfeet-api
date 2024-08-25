import { User as PrismaUser } from '@prisma/client';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { User } from 'src/domain/enterprise/entities/user';

export class PrismaUserMapper {
  static toDomain(user: PrismaUser): User {
    return User.create(
      {
        cpf: user.cpf,
        name: user.name,
        password: user.password,
        role: user.role,
      },
      new UniqueEntityId(user.id),
    );
  }
}
