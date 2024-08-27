import { Module } from '@nestjs/common';
import { AuthenticateUserController } from './controllers/authenticate-user.controller';
import { AuthenticateUserUseCase } from '@/domain/application/use-cases/authenticate-user';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { CreateDeliveryUserController } from './controllers/create-delivery-user.controller';
import { CreateDeliveryUserUseCase } from '@/domain/application/use-cases/create-delivery-user';
import { CreateRecipientController } from './controllers/create-recipient.controller';
import { CreateRecipientUseCase } from '@/domain/application/use-cases/create-recipient';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateUserController,
    CreateDeliveryUserController,
    CreateRecipientController,
  ],
  providers: [
    AuthenticateUserUseCase,
    CreateDeliveryUserUseCase,
    CreateRecipientUseCase,
  ],
})
export class HttpModule {}
