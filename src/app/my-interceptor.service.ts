import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor() {}


  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = 'Custom Token'; 
    const authorizedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  return next.handle(authorizedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        alert("Error 401")
      }
      if (error.status === 404) {
        alert("Error 404")

      }
      if (error.status === 422) {
        alert("Error 422")
      }
      return throwError(error);
    })
  );
  }
}
