import { catchError, finalize, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { PopupService } from './popup.service';
import { ApiBaseResponse } from '../models/api.model';
import { TokenService } from './token.service';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly url: string = environment.config.apiUrl;
  private spinnerCount = 0;

  constructor(
    private http: HttpClient,
    private popupService: PopupService,
    private tokenService: TokenService,
    private spinnerService: SpinnerService
  ) {}

  private startSpinner() {
    this.spinnerService.show();
    this.spinnerCount++;
  }

  private stopSpinner() {
    this.spinnerCount--;

    if (this.spinnerCount === 0) {
      setTimeout(() => this.spinnerService.hide(), 300);
    }
  }

  private getHeaders(): Observable<HttpHeaders> {
    const token = this.tokenService.getJwtToken();
    const headers: { [key: string]: string; } = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }

    return of(new HttpHeaders(headers));
  }

  private toHttpParams(params: any): HttpParams {
    return Object.getOwnPropertyNames(params)
      .reduce((p, key) => p.set(key, params[key]), new HttpParams());
  }

  private handleError(error: HttpErrorResponse | string, withoutErrorMessage?: boolean, errorMessage: string = 'Something went wrong!') {
    if (!withoutErrorMessage) {
      // this.showErrorMessage(error instanceof HttpErrorResponse ? error.error?.message ?? errorMessage : error ?? errorMessage);
      return throwError(() => new Error(error instanceof HttpErrorResponse ? error.error?.message ?? errorMessage : error ?? errorMessage));
    } else {
      return throwError(error instanceof HttpErrorResponse ? error.error?.message ?? errorMessage : error ?? errorMessage);
    }
  }

  private showErrorMessage(message: string) {
    this.popupService.showErrorMessage(message);
  }

  get<T>(
    path: string,
    params: Object = {},
    withoutSpinner?: boolean,
    withoutErrorMessage?: boolean,
    errorMessage?: string
  ): Observable<any> {
    return this.getHeaders()
      .pipe(
        tap(() => withoutSpinner || this.startSpinner()),
        switchMap((headers: HttpHeaders) => this.http.get<ApiBaseResponse<T>>(
            `${this.url}/${path}`,
            {headers, params: this.toHttpParams(params)}
          )
            .pipe(
              map(response => {
                if (!response.success) {
                  throw new Error(response.message);
                }

                return response;
              })
            )
        ),
        catchError((error: HttpErrorResponse) => this.handleError(error, withoutErrorMessage, errorMessage)),
        finalize(() => withoutSpinner || this.stopSpinner())
      );
  }

  post<T>(
    path: string,
    body: Object = {},
    withoutSpinner?: boolean,
    withoutErrorMessage?: boolean,
    errorMessage?: string
  ): Observable<any> {
    return this.getHeaders()
      .pipe(
        tap(() => withoutSpinner || this.startSpinner()),
        switchMap((headers: HttpHeaders) => this.http.post<ApiBaseResponse<T>>(
            `${this.url}/${path}`,
            body,
            { headers }
          )
            .pipe(
              map(response => {
                // if (!response.success) {
                //   throw new Error(response.message);
                // }
                return response;
              })
            )
        ),
        catchError((error: HttpErrorResponse) => this.handleError(error, withoutErrorMessage, errorMessage)),
        finalize(() => withoutSpinner || this.stopSpinner())
      );
  }

  put<T>(
    path: string,
    body: Object = {},
    params: Object = {},
    withoutSpinner?: boolean,
    withoutErrorMessage?: boolean,
    errorMessage?: string
  ): Observable<any> {
    return this.getHeaders()
      .pipe(
        tap(() => withoutSpinner || this.startSpinner()),
        switchMap((headers: HttpHeaders) => this.http.put<ApiBaseResponse<T>>(
            `${this.url}/${path}`,
            body,
            {headers, params: this.toHttpParams(params)}
          )
            .pipe(
              map(response => {
                if (!response.success) {
                  throw new Error(response.message);
                }

                return response;
              })
            )
        ),
        catchError((error: HttpErrorResponse) => this.handleError(error, withoutErrorMessage, errorMessage)),
        finalize(() => withoutSpinner || this.stopSpinner())
      );
  }

  uploadFile<T>(
    path: string,
    body: Object = {},
    withoutSpinner?: boolean,
  ): Observable<any> {
    const token = this.tokenService.getJwtToken();
    return this.http.post<ApiBaseResponse<T>>(
      `${this.url}/${path}`,
      body,
      {
        headers: new HttpHeaders(
          {
            'Authorization': `Bearer ${token}`
          }),
      }
    )
      .pipe(
        tap(() => withoutSpinner || this.startSpinner()),
        finalize(() => withoutSpinner || this.stopSpinner())
      )
  }
}
