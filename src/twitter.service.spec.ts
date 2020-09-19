import { TwitterService } from './twitter.service';
import { TweetsPage, TwitterClient } from './clients/models';

describe('TwitterService', () => {
  let twitterService: TwitterService;
  let twitterClient: TwitterClient;

  beforeEach(() => {
    twitterClient = new MockedTwitterClient();
    twitterService = new TwitterService(twitterClient);
  });

  it('should get all tweets since given ID', async () => {
    const tweets = await twitterService.findTweetsUntil('0');

    expect(tweets).toEqual([
      {
        creationDate: 'Mon Sep 14 06:13:02 +0000 2020',
        id: '4',
        text: 'Asistiré a la #tarugoff #Charlaca3',
        user: '@foo',
        isRetweet: false,
      },
      {
        creationDate: 'Mon Sep 14 06:13:02 +0000 2020',
        id: '3',
        text: 'Asistiré a la #tarugoff #Charlaca4',
        user: '@bar',
        isRetweet: false,
      },
      {
        creationDate: 'Mon Sep 14 06:13:02 +0000 2020',
        id: '1',
        text: 'Asistiré a la #tarugoff #Charlaca5',
        user: '@catalino',
        isRetweet: false,
      },
    ]);
  });
});

class MockedTwitterClient implements TwitterClient {
  async getTarugoffTweets(minId = '0', maxId = '0'): Promise<TweetsPage> {
    if (maxId === '0') {
      return {
        maxId: '5',
        minId: '3',
        tweets: [
          {
            creationDate: 'Mon Sep 14 06:13:02 +0000 2020',
            id: '5',
            text: 'RT Asistiré a la #tarugoff #Charlaca3',
            user: '@foo',
            isRetweet: true,
          },
          {
            creationDate: 'Mon Sep 14 06:13:02 +0000 2020',
            id: '4',
            text: 'Asistiré a la #tarugoff #Charlaca3',
            user: '@foo',
            isRetweet: false,
          },
          {
            creationDate: 'Mon Sep 14 06:13:02 +0000 2020',
            id: '3',
            text: 'Asistiré a la #tarugoff #Charlaca4',
            user: '@bar',
            isRetweet: false,
          },
        ],
      };
    }

    if (maxId === '3') {
      return {
        maxId: '3',
        minId: '1',
        tweets: [
          {
            creationDate: 'Mon Sep 14 06:13:02 +0000 2020',
            id: '3',
            text: 'Asistiré a la #tarugoff #Charlaca4',
            user: '@bar',
            isRetweet: false,
          },
          {
            creationDate: 'Mon Sep 14 06:13:02 +0000 2020',
            id: '2',
            text: 'RT Asistiré a la #tarugoff #Charlaca4',
            user: '@bar',
            isRetweet: true,
          },
          {
            creationDate: 'Mon Sep 14 06:13:02 +0000 2020',
            id: '1',
            text: 'Asistiré a la #tarugoff #Charlaca5',
            user: '@catalino',
            isRetweet: false,
          },
        ],
      };
    }

    return {
      maxId: '0',
      minId: '0',
      tweets: [],
    };
  }
}
