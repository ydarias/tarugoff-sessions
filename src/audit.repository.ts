import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuditRecord } from './models';
import { AuditEntity } from './schemas/audit.schema';

@Injectable()
export class AuditRepository {
  constructor(@InjectModel(AuditEntity.name) private auditModel: Model<AuditEntity>) {}

  async getLastAuditRecord(): Promise<AuditRecord> {
    const result = await this.auditModel
      .find()
      .sort('-executionDate')
      .limit(1)
      .exec();

    if (result.length === 0) {
      return {
        executionDate: new Date(),
        maxId: '0',
        minId: '0',
      };
    }

    return {
      executionDate: result[0].executionDate,
      maxId: result[0].maxId,
      minId: result[0].minId,
    };
  }

  async save(transientAudit: AuditRecord): Promise<AuditEntity> {
    const createdAudit = new this.auditModel(transientAudit);
    return createdAudit.save();
  }
}
