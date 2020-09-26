import { promisify } from 'util';
import axios from 'axios';
import * as request from 'request';
import * as _ from 'lodash';
import { TweetsPage } from './models';
import { Injectable } from '@nestjs/common';
import { TweetsUtils } from '../utils/tweets.utils';

@Injectable()
export class TwitterClient {
  private bearerToken: string;
  private readonly consumerKey: string;
  private readonly consumerSecret: string;

  constructor() {
    this.consumerKey = process.env.TWITTER_CONSUMER_KEY;
    this.consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
  }

  async getTarugoffTweets(minId = '0', maxId = '0'): Promise<TweetsPage> {
    const url = this.buildUrl(minId, maxId);

    console.log(`URL > ${url}`);

    const token = await this.getBearerToken();
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw new Error(JSON.stringify(response.data));
    }

    return this.toTweetsPage(response.data);
  }

  private buildUrl(minId = '0', maxId = '0'): string {
    const twitterSearchUrl = 'https://api.twitter.com/1.1/search/tweets.json';
    const queryParams = `q=%23tarugoff&include_entities=false&result_type=recent&count=100&since_id=${minId}&max_id=${maxId}`;
    return `${twitterSearchUrl}?${queryParams}`;
  }

  private async getBearerToken(): Promise<string> {
    if (!this.bearerToken) {
      this.bearerToken = await this.login();
    }

    return this.bearerToken;
  }

  private async login(): Promise<string> {
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

  private toTweetsPage(data: any): TweetsPage {
    const tweets = data.statuses.map(tweet => ({
      creationDate: tweet.created_at,
      id: tweet.id_str,
      text: tweet.text,
      user: tweet.user.screen_name,
      isRetweet: _.has(tweet, 'retweeted_status'),
    }));

    return {
      maxId: TweetsUtils.getMaxId(tweets),
      minId: TweetsUtils.getMinId(tweets),
      tweets,
    };
  }
}
