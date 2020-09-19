import { Tweet } from '../models';

export interface TwitterClient {
  getTarugoffTweets(minId: string, maxId: string): Promise<TweetsPage>;
}

export interface TweetsPage {
  maxId: string;
  minId: string;
  tweets: Tweet[];
}
