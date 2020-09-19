import { Controller, Get } from '@nestjs/common';
import { HealthResponse, Status } from './models';
import { SessionUpdaterService } from './sessionUpdater.service';

@Controller('/health')
export class HealthController {
  constructor(private readonly sessionUpdater: SessionUpdaterService) {}

  @Get()
  async getHealth(): Promise<HealthResponse> {
    const result = await this.sessionUpdater.update();

    return {
      status: Status.OK,
    };
  }
}
