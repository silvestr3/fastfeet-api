import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from '@/domain/application/repositories/users-repository';
import { PrismaUsersRepository } from './repositories/prisma-users-repository';
import { RecipientsRepository } from '@/domain/application/repositories/recipients-repository';
import { PrismaRecipientsRepository } from './repositories/prisma-recipients-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: RecipientsRepository,
      useClass: PrismaRecipientsRepository,
    },
  ],
  exports: [PrismaService, UsersRepository, RecipientsRepository],
})
export class DatabaseModule {}
