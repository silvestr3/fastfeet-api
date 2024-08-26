import { AppModule } from '@/infra/app.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserFactory } from 'test/factories/fake-users-factory';
import request from 'supertest';
import { PrismaService } from '@/infra/database/prisma.service';
import { BcryptService } from '@/infra/cryptography/bcrypt.service';
import { CryptographyModule } from '@/infra/cryptography/cryptography.module';
import { DatabaseModule } from '@/infra/database/database.module';

describe('Authenticate user e2e test', () => {
  let app: INestApplication;
  let userFactory: UserFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, CryptographyModule, DatabaseModule],
      providers: [UserFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    userFactory = moduleRef.get(UserFactory);

    await app.init();
  });

  test('[POST] /sessions', async () => {
    await userFactory.makePrismaUser({
      cpf: '12312312312',
      password: '123456',
    });

    const response = await request(app.getHttpServer()).post('/sessions').send({
      cpf: '12312312312',
      password: '123456',
    });

    expect(response.statusCode).toEqual(201);
  });
});
