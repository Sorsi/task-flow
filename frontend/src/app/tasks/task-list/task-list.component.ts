import { Component, OnInit, signal, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';
import { normalizeText } from './task-list.util';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TaskListComponent implements OnInit {
  columnsToDisplay: string[] = [
    'title',
    'assignee',
    'dueDate',
    'status',
    'priority',
    'actions',
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  private taskDataSubject$ = new BehaviorSubject<Task[]>([]);
  taskData$ = this.taskDataSubject$.asObservable();
  dataSource = new MatTableDataSource<Task>([]);
  filterControl = new FormControl('');
  expandedElement: Task | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _taskService: TaskService) {}

  ngOnInit() {
    //this._taskService.loadTasks();
    this.loadTasks();
    this.setupFilter();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  private loadTasks() {
    this._taskService.getTasks().subscribe((tasks) => {
      this.taskDataSubject$.next(tasks);
      this.updateTable(tasks);
    });

    //this.loadTasks();
  }

  private setupFilter() {
    this.filterControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((filterValue) => {
        this.applyFilter(filterValue ?? '');
      });
  }

  applyFilter(value: string) {
    const filterValue = normalizeText(value.trim().toLowerCase());
    this.dataSource.filter = filterValue.length >= 3 ? filterValue : '';
  }

  deleteTask(id: string) {
    if (!id) return;
    this._taskService.deleteTask(id).subscribe(() => {
      const updatedTasks = this.taskDataSubject$
        .getValue()
        .filter((task) => task._id !== id);
      this.taskDataSubject$.next(updatedTasks);
      this.updateTable(updatedTasks);
    });
  }

  trackByFn(index: number, item: Task): string {
    return item._id;
  }

  private updateTable(tasks: Task[]) {
    this.dataSource.data = tasks;
  }

  /* getStatusColor(status: string): string {
    switch (status) {
      case Priority.LOW:
        return 'warn';
      case Priority.MEDIUM:
        return 'primary';
      case Priority.HIGH:
        return 'accent';
      default:
        return '';
    }
  } */

  /* get hasTasks$(): Observable<boolean> {
    return this.tasks$.pipe(map((tasks) => tasks?.length > 0));
  } */
}
