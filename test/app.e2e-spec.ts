import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { SessionRepository } from '../src/session.repository';
import * as mongoose from 'mongoose';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    let connection;
    try {
      connection = (await mongoose.connect(process.env.TARUGOFF_DB_URL)).connection;
      await connection.useDb('tarugoff-sessions-tests-e2e').dropCollection('Sessions');
    } finally {
      if (connection) {
        await connection.close();
      }
    }

    process.env['TARUGOFF_DB_URL'] = 'mongodb://localhost/tarugoff-sessions-tests-e2e';

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
