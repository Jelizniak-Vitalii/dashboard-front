import { catchError, Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthFacade } from '../state/facades';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authFacade: AuthFacade
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((response: HttpErrorResponse) => {
          if (response.status === 401) {
            this.authFacade.logout();
          }

          return throwError(response)
        })
      );
  }
}
