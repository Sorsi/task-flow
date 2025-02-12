import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Priority } from '../task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
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

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      assignee: [''],
      dueDate: [''],
      priority: [Priority.MEDIUM],
      completed: [false],
    });
  }

  get titleControl() {
    return this.taskForm.get('title');
  }
}
