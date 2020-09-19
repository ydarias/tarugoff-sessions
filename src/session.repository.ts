import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SessionEntity } from './schemas/session.schema';
import { Session, SessionUpdate } from './models';

@Injectable()
export class SessionRepository {
  constructor(@InjectModel(SessionEntity.name) private sessionModel: Model<SessionEntity>) {}

  async bulkUpdate(sessionUpdates: Session[] = []): Promise<void> {
    for (let i = 0; i < sessionUpdates.length; i++) {
      const updatedSession = sessionUpdates[i];
      const persistentSession = await this.sessionModel.findOne({ sessionId: updatedSession.sessionId }).exec();
      if (persistentSession) {
        persistentSession.votes = persistentSession.votes + updatedSession.votes;
        await persistentSession.save();
      } else {
        await this.saveSession(updatedSession);
      }
    }
  }

  private async saveSession(session: Session): Promise<Session> {
    const createdSession = new this.sessionModel(session);
    return createdSession.save();
  }

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
