import * as moment from 'moment';
import { Mutex, withTimeout } from 'async-mutex';
import { Injectable } from '@nestjs/common';

import { AuditRecord, Tweet } from './models';
import { AuditRepository } from '../repositories/audit.repository';
import { TwitterService } from './twitter.service';
import { TweetsUtils } from '../utils/tweets.utils';
import { SessionUtils } from '../utils/session.utils';
import { SessionRepository } from '../repositories/session.repository';
import { TweetRepository } from '../repositories/tweet.repository';

@Injectable()
export class SessionUpdaterService {
  private readonly mutex: Mutex;

  constructor(
    private readonly auditRepository: AuditRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly tweetRepository: TweetRepository,
    private readonly twitterService: TwitterService,
  ) {
    this.mutex = withTimeout(new Mutex(), 1, new LockNotAcquiredError()) as Mutex;
  }

  async update(): Promise<void> {
    await this.mutex.acquire().then(async release => {
      const executionDate = moment()
        .utc()
        .toDate();

      const lastAuditRecord = await this.auditRepository.getLastAuditRecord();
      const newTweets = await this.twitterService.findTweetsUntil(lastAuditRecord.maxId);
      const updatedSessions = SessionUtils.parse(newTweets);
      await this.sessionRepository.bulkUpdate(updatedSessions);

      await this.createAuditRecord(executionDate, newTweets, lastAuditRecord);

      release();
    });
  }

  async createAuditRecord(executionDate: Date, tweets: Tweet[], lastAuditRecord: AuditRecord): Promise<void> {
    const auditRecord = await this.auditRepository.save({
      executionDate,
      maxId: TweetsUtils.getMaxId(tweets) || lastAuditRecord.maxId,
      minId: TweetsUtils.getMinId(tweets) || lastAuditRecord.minId,
    });
    await this.tweetRepository.bulkInsert(tweets, auditRecord);
  }
}

export class LockNotAcquiredError extends Error {}
