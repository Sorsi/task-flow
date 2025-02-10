import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[];

  constructor() {
    this.tasks = [];
  }
  ngOnInit() {
    console.log('wassssup ?? ');
  }
}
