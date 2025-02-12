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
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {}

  isFormValid(): boolean {
    return this.taskFormComponent?.taskForm.valid ?? false;
  }

  save(): void {
    if (this.isFormValid()) {
      console.log(
        'save dialog is vlaid ',
        this.taskFormComponent.taskForm.value
      );
      const task = this.taskFormComponent.taskForm.value;
      this.taskService
        .createTask(task)
        .subscribe((ta) => console.log('taaa ', ta));
      this.close();
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
