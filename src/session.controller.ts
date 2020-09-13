import { Controller, Get } from '@nestjs/common';
import { SessionResponse } from './models';

@Controller('/sessions')
export class SessionController {
  constructor() {}

  @Get()
  getSessions(): SessionResponse[] {
    return [
      {
        id: 3,
        votes: 1,
      },
    ];
  }
}
