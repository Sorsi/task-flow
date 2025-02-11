import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl(''),
    assignee: new FormControl(''),
    dueDate: new FormControl(null),
    priority: new FormControl('Medium', Validators.required),
    completed: new FormControl(false),
  });

  submitForm() {
    if (this.taskForm.valid) {
      console.log('Task submitted: ', this.taskForm.value);
    }
  }
}
