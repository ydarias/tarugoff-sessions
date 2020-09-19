import { SessionUtils } from './session.utils';

describe('The Session Utils', () => {
  it('should parse the sessions from a list of tweets', () => {
    const sessions = SessionUtils.parse([
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
        text: 'Asistiré a la #tarugoff porque no tengo otra cosa que hacer',
        user: '@hater',
        isRetweet: false,
      },
      {
        creationDate: 'Mon Sep 14 06:13:02 +0000 2020',
        id: '1',
        text: 'Asistiré a la #tarugoff #charlaca4',
        user: '@catalino',
        isRetweet: false,
      },
    ]);

    expect(sessions).toEqual([
      {
        sessionId: 3,
        votes: 1,
      },
      {
        sessionId: 4,
        votes: 2,
      },
    ]);
  });
});
