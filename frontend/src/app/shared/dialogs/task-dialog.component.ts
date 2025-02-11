import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
})
export class TaskDialogComponent {
  readonly dialogRef = inject(MatDialogRef<TaskDialogComponent>);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
