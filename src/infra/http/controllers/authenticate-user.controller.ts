import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { AuthenticateUserUseCase } from 'src/domain/application/use-cases/authenticate-user';

const authenticateUserBodySchema = z.object({
  cpf: z.string().length(11),
  password: z.string(),
});

type AuthenticateUserBodySchema = z.infer<typeof authenticateUserBodySchema>;
const bodyValidationPipe = new ZodValidationPipe(authenticateUserBodySchema);

@Controller('/sessions')
export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: AuthenticateUserBodySchema) {
    const { cpf, password } = body;

    try {
      const { token } = await this.authenticateUserUseCase.execute({
        cpf,
        password,
      });

      return {
        auth_token: token,
      };
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
