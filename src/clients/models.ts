import { Tweet } from '../models';

export interface TweetsPage {
  maxId: string;
  minId: string;
  tweets: Tweet[];
}
