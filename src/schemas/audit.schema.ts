import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Auditory' })
export class AuditEntity extends Document {
  @Prop()
  executionDate: Date;

  @Prop()
  maxId: string;

  @Prop()
  minId: string;
}

export const AuditSchema = SchemaFactory.createForClass(AuditEntity);
