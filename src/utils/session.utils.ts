import * as _ from 'lodash';
import { Session, Tweet } from '../models';

export class SessionUtils {
  static parse(tweets: Tweet[] = []): Session[] {
    const sessionsDictionary = new SessionsDictionary();
    const matcher = /#charlaca(\d+)/i;
    tweets.forEach(tweet => {
      const matches = matcher.exec(tweet.text);
      if (matches) {
        sessionsDictionary.updateSession(parseInt(matches[1]));
      }
    });
    return sessionsDictionary.asSessions();
  }
}

class SessionsDictionary {
  private readonly sessions: Session[] = [];

  updateSession(sessionId: number): void {
    const session = _.find(this.sessions, v => v.sessionId === sessionId);
    if (session) {
      session.votes = session.votes + 1;
    } else {
      this.sessions.push({
        sessionId,
        votes: 1,
      });
    }
  }

  asSessions(): Session[] {
    return this.sessions;
  }
}
