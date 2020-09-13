import { Controller, Get } from '@nestjs/common';
import { SessionResponse } from './models';
import { SessionRepository } from './session.repository';

@Controller('/sessions')
export class SessionController {
  constructor(private readonly sessionRepository: SessionRepository) {}

  @Get()
  async getSessions(): Promise<SessionResponse[]> {
    const sessions = await this.sessionRepository.findSessions();
    return sessions.map(session => ({
      id: session.sessionId,
      votes: session.votes,
    }));
  }
}
