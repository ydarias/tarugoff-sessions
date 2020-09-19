import { Tweet } from '../services/models';

export interface TweetsPage {
  maxId: string;
  minId: string;
  tweets: Tweet[];
}
