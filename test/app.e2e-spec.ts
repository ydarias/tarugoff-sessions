import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { SessionRepository } from '../src/session.repository';
import * as mongoose from 'mongoose';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const connection = (await mongoose.connect(process.env.TARUGOFF_DB_URL)).connection;
    await connection
      .dropCollection('Sessions')
      .then(async () => await connection.close())
      .catch(async () => {
        console.log('Collection Sessions does not exist');
        await connection.close();
      });

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    const sessionRepository = app.get<SessionRepository>(SessionRepository);
    await sessionRepository.updateSession(1, { votes: 23 });
    await sessionRepository.updateSession(2, { votes: 34 });
  });

  it('/sessions (GET)', () => {
    return request(app.getHttpServer())
      .get('/sessions')
      .expect(200)
      .expect([
        {
          id: 1,
          votes: 23,
        },
        {
          id: 2,
          votes: 34,
        },
      ]);
  });

  afterAll(async () => {
    await app.close();
  });
});
