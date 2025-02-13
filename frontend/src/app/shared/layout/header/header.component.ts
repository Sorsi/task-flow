import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskDialogComponent } from '../../dialogs/task-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent {
  title: string;

  constructor(private _dialog: MatDialog) {
    this.title = 'Task Flow';
  }

  openTaskDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this._dialog.open(TaskDialogComponent, dialogConfig);
  }
}
