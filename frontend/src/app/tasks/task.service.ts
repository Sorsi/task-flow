import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Task } from './task.model';
import { ErrorHandlingService } from '../shared/services/error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5050/tasks';

  constructor(
    private _http: HttpClient,
    private _errorHandler: ErrorHandlingService
  ) {}

  getTasks(): Observable<Task[]> {
    return this._http.get<Task[]>(this.apiUrl).pipe(
      catchError((error) => {
        this._errorHandler.handle(error, 'getTask');
        return throwError(() => error);
      })
    );
  }

  getTaskById(id: string): Observable<Task> {
    return this._http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        this._errorHandler.handle(error, 'getTaskById');
        return throwError(() => error);
      })
    );
  }

  createTask(task: Task): Observable<Task> {
    console.log('task ', task);

    return this._http.post<Task>(this.apiUrl, task).pipe(
      catchError((error) => {
        this._errorHandler.handle(error, 'createTask');
        return throwError(() => error);
      })
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this._http.patch<Task>(`${this.apiUrl}/${task.id}`, task).pipe(
      catchError((error) => {
        this._errorHandler.handle(error, 'updateTask');
        return throwError(() => error);
      })
    );
  }

  deleteTask(id: string): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        this._errorHandler.handle(error, 'updateTask');
        return throwError(() => error);
      })
    );
  }
}
