import { Controller, Get } from '@nestjs/common';
import { SessionRepository } from '../repositories/session.repository';
import { SessionResponse } from './models';

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
