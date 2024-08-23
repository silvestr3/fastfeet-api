import { FakeHasher } from 'test/cryptography/fake-hasher';
import { FakeUsersRepository } from 'test/repositories/fake-users-repository';
import { MakeUser } from 'test/factories/fake-users-factory';
import { UnauthorizedError } from './errors/unauthorized-error';
import { DeleteUserUseCase } from './delete-user';
import { DeleteRecipientUseCase } from './delete-recipient';
import { FakeRecipientsRepository } from 'test/repositories/fake-recipients-repository';
import { MakeRecipient } from 'test/factories/fake-recipients-factory';

let usersRepository: FakeUsersRepository;
let recipientsRepository: FakeRecipientsRepository;
let sut: DeleteRecipientUseCase;

describe('Delete recipient use case tests', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    recipientsRepository = new FakeRecipientsRepository();
    sut = new DeleteRecipientUseCase(recipientsRepository, usersRepository);
  });

  it('Should be able to delete an recipient', async () => {
    const adminUser = MakeUser({
      role: 'ADMIN',
    });

    const recipient = MakeRecipient();

    usersRepository.users.push(adminUser);
    recipientsRepository.recipients.push(recipient);

    await sut.execute({
      executorId: adminUser.id.toString(),
      recipientId: recipient.id.toString(),
    });

    expect(recipientsRepository.recipients[0]).toBeUndefined();
  });

  it('Should not be able to delete a recipient with non-admin user', async () => {
    const user1 = MakeUser();
    const recipient = MakeRecipient();

    usersRepository.users.push(user1);
    recipientsRepository.recipients.push(recipient);

    await expect(
      sut.execute({
        executorId: user1.id.toString(),
        recipientId: recipient.id.toString(),
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
