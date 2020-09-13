import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Sessions' })
export class SessionEntity extends Document {
  @Prop()
  sessionId: number;

  @Prop()
  votes: number;
}

export const SessionSchema = SchemaFactory.createForClass(SessionEntity);
