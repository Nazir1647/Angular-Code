import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(private router: Router) { }
  handleError(error: any): void {
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }

    if (error.status === 401) {
      localStorage.clear();
      this.router.navigate(['/']);
    }

    console.log('Error from global error handler', error);
  }
}
