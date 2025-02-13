export interface Task {
  _id: string;
  title: string;
  description?: string;
  assignee?: string;
  added: Date;
  dueDate?: Date | null;
  priority: Priority;
  status: Status;
  completed: Date;
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum Status {
  OPEN = 'open',
  PROGRESS = 'progress',
  DONE = 'done',
  BLOCKED = 'blocked',
}
