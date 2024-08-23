import { FakeUsersRepository } from 'test/repositories/fake-users-repository';
import { MakeUser } from 'test/factories/fake-users-factory';
import { UnauthorizedError } from './errors/unauthorized-error';
import { EditRecipientUseCase } from './edit-recipient';
import { FakeRecipientsRepository } from 'test/repositories/fake-recipients-repository';
import { MakeRecipient } from 'test/factories/fake-recipients-factory';

let usersRepository: FakeUsersRepository;
let recipientsRepository: FakeRecipientsRepository;
let sut: EditRecipientUseCase;

describe('Create delivery user use case tests', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    recipientsRepository = new FakeRecipientsRepository();

    sut = new EditRecipientUseCase(recipientsRepository, usersRepository);
  });

  it("Should be able to edit recipient's description", async () => {
    const adminUser = MakeUser({
      role: 'ADMIN',
    });

    const recipient = MakeRecipient();

    recipientsRepository.recipients.push(recipient);
    usersRepository.users.push(adminUser);

    await sut.execute({
      executorId: adminUser.id.toString(),
      recipientId: recipient.id.toString(),
      name: 'John Doe',
      address: 'New address',
      latitude: 1232123,
      longitude: 9878987,
    });

    expect(recipientsRepository.recipients[0]).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        address: 'New address',
        latitude: 1232123,
        longitude: 9878987,
      }),
    );
  });

  it("Should not be able to change user's password with non-user account", async () => {
    const user = MakeUser();
    usersRepository.users.push(user);

    const recipient = MakeRecipient();
    recipientsRepository.recipients.push(recipient);

    await expect(
      sut.execute({
        executorId: user.id.toString(),
        recipientId: recipient.id.toString(),
        name: 'John Doe',
        address: 'New address',
        latitude: 1232123,
        longitude: 9878987,
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
