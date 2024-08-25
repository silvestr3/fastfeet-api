import { Injectable } from '@nestjs/common';
import { Encrypter } from '../cryptography/encrypter';
import { HashComparer } from '../cryptography/hash-comparer';
import { UsersRepository } from '../repositories/users-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

interface AuthenticateUserUseCaseParams {
  cpf: string;
  password: string;
}

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  public async execute({ cpf, password }: AuthenticateUserUseCaseParams) {
    const user = await this.usersRepository.findByCPF(cpf);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doPasswordsMatch = await this.hashComparer.compare(
      password,
      user.password,
    );

    if (!doPasswordsMatch) {
      throw new InvalidCredentialsError();
    }

    const token = await this.encrypter.encrypt({
      sub: user.id.toString(),
      role: user.role,
    });

    return {
      token,
    };
  }
}
