import { UsersRepository } from '../repositories/users-repository';

interface GetUserByIdUseCaseParams {
  id: string;
}

export class GetUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: GetUserByIdUseCaseParams) {
    const user = await this.usersRepository.findById(id);

    return {
      user,
    };
  }
}
