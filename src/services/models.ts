export interface Session {
  sessionId: number;
  votes: number;
}

export interface SessionUpdate {
  votes: number;
}

export interface Tweet {
  creationDate: string;
  id: string;
  text: string;
  user: string;
  isRetweet: boolean;
}

export interface AuditRecord {
  executionDate: Date;
  maxId: string;
  minId: string;
}
