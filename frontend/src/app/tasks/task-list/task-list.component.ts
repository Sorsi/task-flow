import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[];

  constructor(private taskService: TaskService) {
    this.tasks = [];
  }
  ngOnInit() {
    console.log('wassssup ?? ');
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTask(id: string) {
    console.log('clicked delete');
  }
}
