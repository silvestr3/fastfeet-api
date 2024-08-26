import { AppModule } from '@/infra/app.module';
import { CryptographyModule } from '@/infra/cryptography/cryptography.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { describe } from 'node:test';
import { UserFactory } from 'test/factories/fake-users-factory';
import request from 'supertest';
import { PrismaService } from '@/infra/database/prisma.service';

describe('Create delivery user e2e test', () => {
  let app: INestApplication;
  let userFactory: UserFactory;
  let jwt: JwtService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, CryptographyModule, DatabaseModule],
      providers: [UserFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    userFactory = moduleRef.get(UserFactory);
    jwt = moduleRef.get(JwtService);
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /user', async () => {
    const user = await userFactory.makePrismaUser({
      role: 'ADMIN',
    });

    const token = jwt.sign({
      sub: user.id.toString(),
    });

    const response = await request(app.getHttpServer())
      .post('/user')
      .auth(token, { type: 'bearer' })
      .send({
        name: 'John Doe',
        cpf: '12312312312',
        password: '123456',
      });

    expect(response.statusCode).toEqual(201);

    const userOnDatabase = prisma.user.findUnique({
      where: {
        cpf: '12312312312',
      },
    });

    expect(userOnDatabase).toBeTruthy();
  });
});
