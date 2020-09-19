import * as moment from 'moment';
import { Injectable } from '@nestjs/common';

import { Session } from './models';
import { AuditRepository } from './audit.repository';
import { TwitterService } from './twitter.service';
import { TweetsUtils } from './utils/tweets.utils';
import { SessionUtils } from './utils/session.utils';
import { SessionRepository } from './session.repository';

@Injectable()
export class SessionUpdaterService {
  constructor(
    private readonly auditRepository: AuditRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly twitterService: TwitterService,
  ) {}

  async update(): Promise<Session[]> {
    const executionDate = moment()
      .utc()
      .toDate();

    const lastAuditRecord = await this.auditRepository.getLastAuditRecord();
    const newTweets = await this.twitterService.findTweetsUntil(lastAuditRecord.maxId);
    const updatedSessions = SessionUtils.parse(newTweets);
    await this.sessionRepository.bulkUpdate(updatedSessions);

    await this.auditRepository.save({
      executionDate,
      maxId: TweetsUtils.getMaxId(newTweets) || lastAuditRecord.maxId,
      minId: TweetsUtils.getMinId(newTweets) || lastAuditRecord.minId,
    });

    return updatedSessions;
  }
}
