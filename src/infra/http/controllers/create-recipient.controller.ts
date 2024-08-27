import { CreateRecipientUseCase } from '@/domain/application/use-cases/create-recipient';
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
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { UnauthorizedError } from '@/domain/application/use-cases/errors/unauthorized-error';
import { AuthGuard } from '@nestjs/passport';

const createRecipientBodySchema = z.object({
  name: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

type CreateRecipientBodyType = z.infer<typeof createRecipientBodySchema>;
const bodyValidationPipe = new ZodValidationPipe(createRecipientBodySchema);

@Controller('/recipient')
export class CreateRecipientController {
  constructor(private createRecipientUseCase: CreateRecipientUseCase) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async handle(
    @Body(bodyValidationPipe) body: CreateRecipientBodyType,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, address, latitude, longitude } = body;
    const { sub } = user;

    await this.createRecipientUseCase.execute({
      executorId: sub,
      name,
      address,
      latitude,
      longitude,
    });
    // try {
    // } catch (error) {
    //   if (error instanceof UnauthorizedError) {
    //     throw new UnauthorizedException(error.message);
    //   }
    //   throw new BadRequestException(error.message);
    // }
  }
}
