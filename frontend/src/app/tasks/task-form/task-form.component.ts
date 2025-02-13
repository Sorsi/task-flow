import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Priority } from '../task.model';

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
  priorities: Priority[] = [Priority.LOW, Priority.MEDIUM, Priority.HIGH];

  constructor(private _fb: FormBuilder) {
    this.taskForm = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      assignee: [''],
      dueDate: [new Date()],
      priority: [Priority.MEDIUM],
      completed: [false],
    });
  }

  get titleControl() {
    return this.taskForm.get('title');
  }
}
