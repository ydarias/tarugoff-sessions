import { Tweet } from '../services/models';
import * as _ from 'lodash';

export class TweetsUtils {
  static getMaxId(tweets: Tweet[]): string {
    return _.chain(tweets)
      .map(tweet => tweet.id)
      .max()
      .value();
  }

  static getMinId(tweets: Tweet[]): string {
    return _.chain(tweets)
      .map(tweet => tweet.id)
      .min()
      .value();
  }
}
