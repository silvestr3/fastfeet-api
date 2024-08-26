import { CreateDeliveryUserUseCase } from '@/domain/application/use-cases/create-delivery-user';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { UserAlreadyExistsError } from '@/domain/application/use-cases/errors/user-already-exists-error';
import { UnauthorizedError } from '@/domain/application/use-cases/errors/unauthorized-error';

const createDeliveryUserBodySchema = z.object({
  name: z.string(),
  cpf: z.string().length(11),
  password: z.string(),
});

type CreateDeliveryUserBodySchema = z.infer<
  typeof createDeliveryUserBodySchema
>;
const bodyValidationPipe = new ZodValidationPipe(createDeliveryUserBodySchema);

@Controller('/user')
@UseGuards(AuthGuard('jwt'))
export class CreateDeliveryUserController {
  constructor(private createDeliveryUserUseCase: CreateDeliveryUserUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateDeliveryUserBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { cpf, name, password } = body;
    const { sub } = user;

    try {
      await this.createDeliveryUserUseCase.execute({
        executorId: sub,
        name,
        cpf,
        password,
      });
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        throw new BadRequestException(error.message);
      }
      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedException(error.message);
      }

      throw new BadRequestException();
    }
  }
}
