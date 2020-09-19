import * as _ from 'lodash';
import { Tweet } from './models';
import { TweetsPage, TwitterClient } from './clients/models';

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

    return this.removeDuplicatesAndRetweets(tweets);
  }

  private removeDuplicatesAndRetweets(tweets: any[]): Tweet[] {
    return _.chain(tweets)
      .filter(tweet => !tweet.isRetweet)
      .uniqBy('id')
      .value();
  }
}
