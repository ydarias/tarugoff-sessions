import { Controller, Get } from '@nestjs/common';
import { HealthResponse, Status } from './models';
import { LockNotAcquiredError, SessionUpdaterService } from './sessionUpdater.service';

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
