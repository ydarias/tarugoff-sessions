import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionRepository } from './session.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionEntity, SessionSchema } from './schemas/session.schema';

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
      ],
      'sessions',
    ),
  ],
  controllers: [SessionController],
  providers: [SessionRepository],
})
export class AppModule {}
