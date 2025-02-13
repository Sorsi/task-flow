import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less'],
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(private _taskService: TaskService) {
    this.tasks$ = this._taskService.getTasks();
  }
  ngOnInit() {
    this._taskService.loadTasks();
  }

  deleteTask(id: string) {
    if (!id) return;
    this._taskService.deleteTask(id).subscribe({
      error: (err) => {
        console.error('Error loading tasks:', err);
      },
    });
  }
}
