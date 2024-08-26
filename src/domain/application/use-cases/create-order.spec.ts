import { FakeUsersRepository } from 'test/repositories/fake-users-repository';
import { MakeUser } from 'test/factories/fake-users-factory';
import { UnauthorizedError } from './errors/unauthorized-error';
import { CreateOrderUseCase } from './create-order';
import { FakeOrdersRepository } from 'test/repositories/fake-orders-repository';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { FakeRecipientsRepository } from 'test/repositories/fake-recipients-repository';
import { MakeRecipient } from 'test/factories/fake-recipients-factory';

let usersRepository: FakeUsersRepository;
let ordersRepository: FakeOrdersRepository;
let recipientsRepository: FakeRecipientsRepository;
let sut: CreateOrderUseCase;

describe('Create order use case tests', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    ordersRepository = new FakeOrdersRepository();
    recipientsRepository = new FakeRecipientsRepository();

    sut = new CreateOrderUseCase(
      usersRepository,
      ordersRepository,
      recipientsRepository,
    );
  });

  it('Should be able to create a new order', async () => {
    const adminUser = MakeUser({
      role: 'ADMIN',
    });

    const recipient = MakeRecipient();

    usersRepository.users.push(adminUser);
    recipientsRepository.recipients.push(recipient);

    await sut.execute({
      executorId: adminUser.id.toString(),
      description: 'Test order',
      recipientId: recipient.id.toString(),
    });

    expect(ordersRepository.orders[0]).toEqual(
      expect.objectContaining({
        description: 'Test order',
        recipientId: recipient.id,
        status: 'NEW',
      }),
    );
  });

  it('Should not be able to create an order with non-admin account', async () => {
    const nonAdminUser = MakeUser();
    usersRepository.users.push(nonAdminUser);

    await expect(
      sut.execute({
        executorId: nonAdminUser.id.toString(),
        description: 'Test order',
        recipientId: 'recipient-01',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
