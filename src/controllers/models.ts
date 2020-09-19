export interface SessionResponse {
  id: number;
  votes: number;
}

export interface HealthResponse {
  status: Status;
}

export enum Status {
  OK = 'ok',
  ERROR = 'error',
}
