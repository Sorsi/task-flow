import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Task } from './task.model';
import { ErrorHandlingService } from '../shared/services/error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _apiUrl = 'http://localhost:5050/tasks';
  private _tasksSubject = new BehaviorSubject<Task[]>([]);

  constructor(
    private _http: HttpClient,
    private _errorHandler: ErrorHandlingService
  ) {
    this.loadTasks();
  }

  /* Getting data stream */
  getTasks(): Observable<Task[]> {
    return this._tasksSubject.asObservable();
  }

  /* Loading data from API and updating the stream */
  loadTasks(): void {
    console.log('task service loadtasks');

    this._http.get<Task[]>(this._apiUrl).subscribe({
      next: (tasks) => this._tasksSubject.next(tasks),
      error: (error) => {
        this._errorHandler.handle(error, 'getTask');
        return throwError(() => error);
      },
    });
  }

  getTaskById(id: string): Observable<Task> {
    return this._http.get<Task>(`${this._apiUrl}/${id}`).pipe(
      catchError((error) => {
        this._errorHandler.handle(error, 'getTaskById');
        return throwError(() => error);
      })
    );
  }

  /* Adding new task and updating the stream */
  createTask(task: Task): Observable<Task> {
    console.log('TASK ', task);

    return this._http.post<Task>(this._apiUrl, task).pipe(
      tap((newTask) => {
        this._tasksSubject.next([...this._tasksSubject.value, newTask]);
      }),
      catchError((error) => {
        this._errorHandler.handle(error, 'createTask');
        return throwError(() => error);
      })
    );
  }

  /* Updating the task and the stream as well */
  updateTask(task: Task): Observable<Task> {
    return this._http.patch<Task>(`${this._apiUrl}/${task._id}`, task).pipe(
      tap((newTask) => {
        this._tasksSubject.next([...this._tasksSubject.value, newTask]);
      }),
      catchError((error) => {
        this._errorHandler.handle(error, 'updateTask');
        return throwError(() => error);
      })
    );
  }

  /* Deleting task by ID and updating the stream */
  deleteTask(id: string): Observable<void> {
    return this._http.delete<void>(`${this._apiUrl}/${id}`).pipe(
      tap(() => {
        const updatedTasks = this._tasksSubject.value.filter(
          (t) => t._id !== id
        );
        this._tasksSubject.next(updatedTasks);
      }),
      catchError((error) => {
        this._errorHandler.handle(error, 'updateTask');
        return throwError(() => error);
      })
    );
  }
}
