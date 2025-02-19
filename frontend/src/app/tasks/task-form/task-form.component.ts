import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPriority, Priority } from '../task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.less'],
})
export class TaskFormComponent {
  readonly minDate = new Date();
  taskForm: FormGroup;
  taskFormLabels = {
    title: 'Title',
    description: 'Sample task description',
    assignee: 'Assigne',
    dueDate: 'Due Date',
    priority: 'Priority',
    completed: 'Completed',
  };
  readonly priorities: IPriority[];

  constructor(private _fb: FormBuilder) {
    this.priorities = [
      {
        id: 0,
        value: Priority.LOW,
      },
      {
        id: 1,
        value: Priority.MEDIUM,
      },
      {
        id: 2,
        value: Priority.HIGH,
      },
    ];

    this.taskForm = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      assignee: [''],
      dueDate: [new Date()],
      priority: [this.priorities[0]],
      completed: [false],
    });
  }

  get titleControl() {
    return this.taskForm.get('title');
  }
}
