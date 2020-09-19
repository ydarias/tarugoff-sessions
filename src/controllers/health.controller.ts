import { Controller, Get } from '@nestjs/common';
import { LockNotAcquiredError, SessionUpdaterService } from '../services/sessionUpdater.service';
import { HealthResponse, Status } from './models';

@Controller('/health')
export class HealthController {
  constructor(private readonly sessionUpdater: SessionUpdaterService) {}

  @Get()
  async getHealth(): Promise<HealthResponse> {
    try {
      await this.sessionUpdater.update();
    } catch (e) {
      if (e instanceof LockNotAcquiredError) {
        console.log('Lock busy');
      }
    }

    return {
      status: Status.OK,
    };
  }
}
