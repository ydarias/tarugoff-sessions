import { TwitterService } from './twitter.service';

describe('TwitterService', () => {
  let twitterService: TwitterService;

  beforeEach(() => {
    twitterService = new TwitterService();
  });

  it('should get all tweets since given ID', () => {
    const tweets = twitterService.findTweetsSince(0);

    expect(tweets).toEqual(
      expect.arrayContaining([
        {
          creationDate: 'Mon Sep 14 06:13:02 +0000 2020',
          id: 1,
          text: 'Asistiré a la #tarugoff #Charlaca3',
          user: '@foo',
        },
        {
          creationDate: 'Mon Sep 14 06:13:02 +0000 2020',
          id: 2,
          text: 'Asistiré a la #tarugoff #Charlaca4',
          user: '@bar',
        },
        {
          creationDate: 'Mon Sep 14 06:13:02 +0000 2020',
          id: 4,
          text: 'Asistiré a la #tarugoff #Charlaca5',
          user: '@catalino',
        },
      ]),
    );
  });
});
