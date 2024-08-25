import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/domain/application/repositories/users-repository';
import { User } from 'src/domain/enterprise/entities/user';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByCPF(cpf: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    });

    return PrismaUserMapper.toDomain(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return PrismaUserMapper.toDomain(user);
  }

  async create(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async save(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
