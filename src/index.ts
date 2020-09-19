import { SimpleTwitterClient } from './clients/simpleTwitterClient';
import { TwitterService } from './twitter.service';

const consumer_key = process.env.TWITTER_CONSUMER_KEY;
const consumer_secret = process.env.TWITTER_CONSUMER_SECRET;

(async () => {
  const twitterClient = new SimpleTwitterClient(consumer_key, consumer_secret);
  const twitterService = new TwitterService(twitterClient);

  const tweets = await twitterService.findTweetsUntil();

  tweets.forEach(tweet => console.log(tweet));
})();
