import { FakeRecipientsRepository } from 'test/repositories/fake-recipients-repository';
import { GetRecipientByIdUseCase } from './get-recipient-by-id';
import { MakeRecipient } from 'test/factories/fake-recipients-factory';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let recipientsRepository: FakeRecipientsRepository;
let sut: GetRecipientByIdUseCase;

describe('Get recipient by id use case tests', () => {
  beforeEach(() => {
    recipientsRepository = new FakeRecipientsRepository();
    sut = new GetRecipientByIdUseCase(recipientsRepository);
  });

  it('Should be able to return a recipient by its id', async () => {
    const recipient = MakeRecipient();
    recipientsRepository.recipients.push(recipient);

    const result = await sut.execute({
      id: recipient.id.toString(),
    });

    expect(result.recipient).toEqual(recipient);
  });

  it('Should throw when recipient is not found', async () => {
    await expect(
      sut.execute({
        id: '123',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
