import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvService } from '../env/env.service';
import { z } from 'zod';
import { Injectable } from '@nestjs/common';

export const tokenPayload = z.object({
  sub: z.string().uuid(),
});

export type UserPayload = z.infer<typeof tokenPayload>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private env: EnvService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.get('JWT_SECRET'),
      algorithms: ['HS256'],
    });
  }

  async validate(payload: UserPayload) {
    return tokenPayload.parse(payload);
  }
}
