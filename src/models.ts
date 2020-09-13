export interface SessionResponse {
  id: number;
  votes: number;
}

export interface Session {
  sessionId: number;
  votes: number;
}

export interface SessionUpdate {
  votes: number;
}
