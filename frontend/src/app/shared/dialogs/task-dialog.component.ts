import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
})
export class TaskDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<TaskDialogComponent>);

  form: FormGroup;
  description: string;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
    this.description = '';
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.description || []],
      description: [this.description || []],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    console.log('SAVE this.form.value ', this.form.value);

    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}
