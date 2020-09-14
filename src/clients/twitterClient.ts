import { promisify } from 'util';
import axios from 'axios';
import * as request from 'request';
import * as _ from 'lodash';
import { Tweet } from '../models';

export class TwitterClient {
  private bearerToken: string;

  constructor(private readonly consumerKey: string, private readonly consumerSecret: string) {}

  async login(): Promise<string> {
    const requestConfig = {
      url: 'https://api.twitter.com/oauth2/token',
      auth: {
        user: this.consumerKey,
        pass: this.consumerSecret,
      },
      form: {
        grant_type: 'client_credentials',
      },
    };

    const post = promisify(request.post);
    const response = await post(requestConfig);
    if (response.statusCode !== 200) {
      throw new Error(JSON.stringify(response.body));
    }

    return JSON.parse(response.body)['access_token'];
  }

  async getTarugoffTweets(lastId: number = 0): Promise<Tweet[]> {
    const url = this.buildUrl(lastId);
    const token = await this.getBearerToken();
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw new Error(JSON.stringify(response.data));
    }

    return response.data.statuses.map(tweet => ({
      creationDate: tweet.created_at,
      id: tweet.id,
      text: tweet.text,
      user: tweet.user.screen_name,
      isRetweet: _.has(tweet, 'retweeted_status'),
    }));
  }

  private buildUrl(lastId: number = 0): string {
    const twitterSearchUrl = 'https://api.twitter.com/1.1/search/tweets.json';
    const queryParams = `q=%23tarugoff&include_entities=false&result_type=recent&count=5&max_id=${lastId}`;
    return `${twitterSearchUrl}?${queryParams}`;
  }

  private async getBearerToken(): Promise<string> {
    if (!this.bearerToken) {
      this.bearerToken = await this.login();
    }

    return this.bearerToken;
  }
}
