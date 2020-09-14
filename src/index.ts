import { TwitterClient } from './clients/twitterClient';

const consumer_key = process.env.TWITTER_CONSUMER_KEY;
const consumer_secret = process.env.TWITTER_CONSUMER_SECRET;

(async () => {
  const client = new TwitterClient(consumer_key, consumer_secret);
  const tarugoffTweets = await client.getTarugoffTweets();

  tarugoffTweets.forEach(tweet => console.log(tweet));

  const lastId = tarugoffTweets[tarugoffTweets.length - 1].id;

  const tarugoffTweets2 = await client.getTarugoffTweets(lastId);

  tarugoffTweets2.forEach(tweet => console.log(tweet));
})();
