import { TweetsUtils } from './tweets.utils';
import { Tweet } from '../services/models';

describe('The Tweets Utils', () => {
  const tweets: Tweet[] = [
    {
      creationDate: 'Sat Sep 26 14:36:28 +0000 2020',
      id: '1309864418956673000',
      text:
        'RT @tarugoconf: No dejes para mañana lo que puedas hacer hoy. Envía una propuesta a la #tarugoff, el Open Space de la #tarugo20 y devuelve…',
      user: 'javilopezcam',
      isRetweet: true,
    },
    {
      creationDate: 'Sat Sep 26 09:46:43 +0000 2020',
      id: '1309791502151942100',
      text:
        'Mis favoritas para la #tarugoff, el open space de la @tarugoconf, son #Charlaca1 y #Charlaca8… https://t.co/3Y1sYrqlV1',
      user: 'juanmi_tw',
      isRetweet: false,
    },
  ];

  it('should detect the max id', () => {
    const result = TweetsUtils.getMaxId(tweets);

    expect(result).toEqual('1309864418956673000');
  });

  it('should detec the min id', () => {
    const result = TweetsUtils.getMinId(tweets);

    expect(result).toEqual('1309791502151942100');
  });
});
