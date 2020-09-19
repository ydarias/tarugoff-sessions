import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tweet } from './models';
import { AuditEntity } from './schemas/audit.schema';
import { TweetEntity } from './schemas/tweet.schema';

@Injectable()
export class TweetRepository {
  constructor(@InjectModel(TweetEntity.name) private readonly tweetModel: Model<TweetEntity>) {}

  async bulkInsert(tweets: Tweet[], auditEntity: AuditEntity): Promise<Tweet[]> {
    const tweetsWithAudit = _.map(tweets, (tweet: Tweet) => {
      const tweetEntity = {
        creationDate: tweet.creationDate,
        id: tweet.id,
        text: tweet.text,
        user: tweet.user,
        isRetweet: tweet.isRetweet,
        auditRecord: auditEntity._id as string,
      };
      return new this.tweetModel(tweetEntity);
    });

    await this.tweetModel.insertMany(tweetsWithAudit);

    return tweets;
  }
}
