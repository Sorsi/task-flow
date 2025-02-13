import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskFormComponent } from 'src/app/tasks/task-form/task-form.component';
import { TaskService } from 'src/app/tasks/task.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
})
export class TaskDialogComponent implements OnInit {
  @ViewChild(TaskFormComponent) taskFormComponent!: TaskFormComponent;

  constructor(
    private _dialogRef: MatDialogRef<TaskDialogComponent>,
    private _taskService: TaskService
  ) {}

  ngOnInit(): void {}

  isFormValid(): boolean {
    return this.taskFormComponent?.taskForm.valid ?? false;
  }

  save(): void {
    if (this.isFormValid()) {
      this._taskService
        .createTask(this.taskFormComponent.taskForm.value)
        .subscribe();
      this.close();
    }
  }

  close(): void {
    this._dialogRef.close();
  }
}
