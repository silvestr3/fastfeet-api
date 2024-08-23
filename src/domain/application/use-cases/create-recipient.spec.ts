import { FakeUsersRepository } from 'test/repositories/fake-users-repository';
import { MakeUser } from 'test/factories/fake-users-factory';
import { UnauthorizedError } from './errors/unauthorized-error';
import { CreateRecipientUseCase } from './create-recipient';
import { FakeRecipientsRepository } from 'test/repositories/fake-recipients-repository';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

let usersRepository: FakeUsersRepository;
let recipientsRepository: FakeRecipientsRepository;
let sut: CreateRecipientUseCase;

describe('Create recipient use case tests', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    recipientsRepository = new FakeRecipientsRepository();

    sut = new CreateRecipientUseCase(usersRepository, recipientsRepository);
  });

  it('Should be able to create a new recipient', async () => {
    const adminUser = MakeUser({
      role: 'ADMIN',
    });

    usersRepository.users.push(adminUser);

    await sut.execute({
      executorId: adminUser.id.toString(),
      name: 'John Doe',
      address: 'Test address',
      latitude: 1232123,
      longitude: 1232123,
    });

    expect(recipientsRepository.recipients[0]).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        address: 'Test address',
      }),
    );
  });

  it('Should not be able to create an recipient with non-admin account', async () => {
    const nonAdminUser = MakeUser();
    usersRepository.users.push(nonAdminUser);

    await expect(
      sut.execute({
        executorId: nonAdminUser.id.toString(),
        name: 'John Doe',
        address: 'Test address',
        latitude: 1232123,
        longitude: 1232123,
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
