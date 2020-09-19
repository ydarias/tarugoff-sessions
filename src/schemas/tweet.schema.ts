import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AuditEntity } from './audit.schema';

@Schema({ collection: 'Tweets' })
export class TweetEntity extends Document {
  @Prop()
  creationDate: string;

  @Prop()
  id: string;

  @Prop()
  text: string;

  @Prop()
  user: string;

  @Prop()
  isRetweet: boolean;

  @Prop()
  auditRecord: string;
}

export const TweetSchema = SchemaFactory.createForClass(TweetEntity);
