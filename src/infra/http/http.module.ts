import { Module } from '@nestjs/common';
import { AuthenticateUserController } from './controllers/authenticate-user.controller';
import { AuthenticateUserUseCase } from '@/domain/application/use-cases/authenticate-user';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { CreateDeliveryUserController } from './controllers/create-delivery-user.controller';
import { CreateDeliveryUserUseCase } from '@/domain/application/use-cases/create-delivery-user';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [AuthenticateUserController, CreateDeliveryUserController],
  providers: [AuthenticateUserUseCase, CreateDeliveryUserUseCase],
})
export class HttpModule {}
