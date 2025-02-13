import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  logError(message: string, error: any) {
    console.error(message, error);
  }
}
