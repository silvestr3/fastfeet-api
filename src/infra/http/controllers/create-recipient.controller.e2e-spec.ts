import { AppModule } from '@/infra/app.module';
import { CryptographyModule } from '@/infra/cryptography/cryptography.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { RecipientFactory } from 'test/factories/fake-recipients-factory';
import { UserFactory } from 'test/factories/fake-users-factory';
import request from 'supertest';

describe('Create recipient e2e test', () => {
  let app: INestApplication;
  let userFactory: UserFactory;
  let recipientFactory: RecipientFactory;
  let jwt: JwtService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, CryptographyModule],
      providers: [UserFactory, RecipientFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    userFactory = moduleRef.get(UserFactory);
    recipientFactory = moduleRef.get(RecipientFactory);
    jwt = moduleRef.get(JwtService);
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /recipient', async () => {
    const user = await userFactory.makePrismaUser({
      role: 'ADMIN',
    });

    const token = jwt.sign({
      sub: user.id.toString(),
    });

    const response = await request(app.getHttpServer())
      .post('/recipient')
      .auth(token, { type: 'bearer' })
      .send({
        name: 'John Doe',
        address: 'Test address desse corno',
        latitude: 123123,
        longitude: 879128,
      });

    expect(response.statusCode).toEqual(201);

    const recipientOnDatabase = await prisma.recipient.findFirst({
      where: {
        name: 'John Doe',
      },
    });

    expect(recipientOnDatabase).toBeTruthy();
  });
});
