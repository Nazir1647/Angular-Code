import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(
        (err: HttpErrorResponse | Error) => {
          debugger
          if (err instanceof HttpErrorResponse) {
            console.error('Server side error' + err);
          } else {
            console.error('Not a httpErrorResponse' + err);
          }
          return throwError(() => err);
        })
    );
  }
}
