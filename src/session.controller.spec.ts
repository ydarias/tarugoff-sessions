import { SessionController } from './session.controller';
import { SessionRepository } from './session.repository';

describe('SessionController', () => {
  let sessionController: SessionController;
  let sessionRepository: SessionRepository;

  beforeEach(async () => {
    sessionRepository = new SessionRepository();
    sessionController = new SessionController(sessionRepository);
  });

  it('should return sessions provided by sessionRepository', async () => {
    jest.spyOn(sessionRepository, 'findSessions').mockResolvedValue([
      {
        id: 'DB-id-1',
        sessionId: 1,
        votes: 4,
      },
      {
        id: 'DB-id-2',
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
