import { Module } from '@nestjs/common';
import { SessionController } from './controllers/session.controller';
import { SessionRepository } from './repositories/session.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionEntity, SessionSchema } from './schemas/session.schema';
import { HealthController } from './controllers/health.controller';
import { SessionUpdaterService } from './services/sessionUpdater.service';
import { AuditEntity, AuditSchema } from './schemas/audit.schema';
import { TwitterService } from './services/twitter.service';
import { AuditRepository } from './repositories/audit.repository';
import { TwitterClient } from './clients/twitter.client';
import { TweetEntity, TweetSchema } from './schemas/tweet.schema';
import { TweetRepository } from './repositories/tweet.repository';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.TARUGOFF_DB_URL || 'mongodb://localhost/tarugoff-sessions', {
      connectionName: 'sessions',
    }),
    MongooseModule.forFeature(
      [
        {
          name: SessionEntity.name,
          schema: SessionSchema,
        },
        {
          name: AuditEntity.name,
          schema: AuditSchema,
        },
        {
          name: TweetEntity.name,
          schema: TweetSchema,
        },
      ],
      'sessions',
    ),
  ],
  controllers: [SessionController, HealthController],
  providers: [
    SessionRepository,
    AuditRepository,
    TweetRepository,
    TwitterClient,
    TwitterService,
    SessionUpdaterService,
  ],
})
export class AppModule {}
