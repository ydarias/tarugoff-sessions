import { SessionController } from './session.controller';
import { SessionRepository } from '../repositories/session.repository';
import { Model } from 'mongoose';
import { SessionEntity } from '../schemas/session.schema';

describe('SessionController', () => {
  let sessionController: SessionController;
  let sessionRepository: SessionRepository;

  beforeEach(() => {
    const sessionModel = {} as Model<SessionEntity>;
    sessionRepository = new SessionRepository(sessionModel);
    sessionController = new SessionController(sessionRepository);
  });

  it('should return sessions provided by sessionRepository', async () => {
    jest.spyOn(sessionRepository, 'findSessions').mockResolvedValue([
      {
        sessionId: 1,
        votes: 4,
      },
      {
        sessionId: 2,
        votes: 6,
      },
    ]);

    const response = await sessionController.getSessions();

    expect(response).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          votes: 4,
        },
        {
          id: 2,
          votes: 6,
        },
      ]),
    );
  });
});
