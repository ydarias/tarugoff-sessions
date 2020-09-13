import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SessionEntity } from './schemas/session.schema';
import { Session, SessionUpdate } from './models';

@Injectable()
export class SessionRepository {
  constructor(@InjectModel(SessionEntity.name) private sessionModel: Model<SessionEntity>) {}

  async updateSession(sessionId: number, sessionUpdate: SessionUpdate): Promise<Session> {
    const updatedSession = await this.sessionModel.findOneAndUpdate({ sessionId }, sessionUpdate, {
      new: true,
      upsert: true,
      useFindAndModify: false,
    });

    return updatedSession;
  }

  async findSessions(): Promise<Session[]> {
    return this.sessionModel.find().exec();
  }
}
