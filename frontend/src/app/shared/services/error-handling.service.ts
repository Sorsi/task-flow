import { Injectable } from '@angular/core';
import { LoggerService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor(private _logger: LoggerService) {}
  handle(error: any, context: string = ''): void {
    this._logger.logError(`Error in ${context}:`, error);

    alert(`An error occurred: ${error.message}`);
  }
}
