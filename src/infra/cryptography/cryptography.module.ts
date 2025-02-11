import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { Encrypter } from '@/domain/application/cryptography/encrypter';
import { JwtEncrypterService } from './encrypter.service';
import { HashGenerator } from '@/domain/application/cryptography/hash-generator';
import { BcryptService } from './bcrypt.service';
import { HashComparer } from '@/domain/application/cryptography/hash-comparer';

@Module({
  imports: [AuthModule],
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypterService,
    },
    {
      provide: HashGenerator,
      useClass: BcryptService,
    },
    {
      provide: HashComparer,
      useClass: BcryptService,
    },
  ],
  exports: [Encrypter, HashGenerator, HashComparer],
})
export class CryptographyModule {}
