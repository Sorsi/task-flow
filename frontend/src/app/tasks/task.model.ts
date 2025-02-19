export interface Task {
  _id: string;
  title: string;
  description?: string;
  assignee?: string;
  added: Date;
  dueDate?: Date | null;
  priority: IPriority;
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
export interface IPriority {
  id: number;
  value: Priority;
}
