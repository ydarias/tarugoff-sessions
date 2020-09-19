import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionRepository } from './session.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionEntity, SessionSchema } from './schemas/session.schema';
import { HealthController } from './health.controller';
import { SessionUpdaterService } from './sessionUpdater.service';
import { AuditEntity, AuditSchema } from './schemas/audit.schema';
import { TwitterService } from './twitter.service';
import { AuditRepository } from './audit.repository';
import { TwitterClient } from './clients/twitter.client';

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
      ],
      'sessions',
    ),
  ],
  controllers: [SessionController, HealthController],
  providers: [SessionRepository, AuditRepository, TwitterClient, TwitterService, SessionUpdaterService],
})
export class AppModule {}
