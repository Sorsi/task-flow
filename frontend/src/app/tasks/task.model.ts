export interface Task {
  id: string;
  name: string;
  assignee?: string;
  added: Date;
  completed: Date;
}
