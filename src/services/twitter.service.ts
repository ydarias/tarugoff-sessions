import { Tweet } from './models';
import { TweetsPage } from '../clients/models';
import { Injectable } from '@nestjs/common';
import { TwitterClient } from '../clients/twitter.client';
import { TweetsUtils } from '../utils/tweets.utils';

@Injectable()
export class TwitterService {
  constructor(private readonly twitterClient: TwitterClient) {}

  async findTweetsUntil(id = '0'): Promise<Tweet[]> {
    const tweets = [];
    let tweetsPage: TweetsPage;
    let lastQuery = '0';
    do {
      tweetsPage = await this.twitterClient.getTarugoffTweets(id, tweetsPage?.minId);
      tweets.push(...tweetsPage.tweets);
      if (tweetsPage.minId === lastQuery) {
        break;
      }
      lastQuery = tweetsPage.minId;
    } while (tweetsPage.tweets.length > 0);

    return TweetsUtils.removeDuplicatesAndRetweets(tweets);
  }
}
