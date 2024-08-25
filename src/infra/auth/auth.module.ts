import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      imports: [EnvModule],
      inject: [EnvService],
      useFactory(env: EnvService) {
        const jwtSecret = env.get('JWT_SECRET');

        return {
          secret: jwtSecret,
          signOptions: {
            algorithm: 'HS256',
          },
        };
      },
    }),
  ],
})
export class AuthModule {}
