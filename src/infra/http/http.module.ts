import { Module } from '@nestjs/common';
import { AuthenticateUserController } from './controllers/authenticate-user.controller';
import { AuthenticateUserUseCase } from 'src/domain/application/use-cases/authenticate-user';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [AuthenticateUserController],
  providers: [AuthenticateUserUseCase],
})
export class HttpModule {}
