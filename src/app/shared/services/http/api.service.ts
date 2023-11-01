import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';

import { TokenService } from '../token.service';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../toast.service';
import { SpinnerService } from '../spinner.service';
import { HttpOptions, IApiBaseActions, IApiBaseResponse } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements IApiBaseActions {
  private readonly url: string = environment.config.apiUrl;
  private spinnerCount = 0;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private toastService: ToastService,
    private spinnerService: SpinnerService
  ) {}

  private getHeaders(headers: { [key: string]: string } = { 'Content-Type': 'application/json' }): HttpHeaders {
    const token = this.tokenService.getJwtToken();

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      ...headers
    });
  }

  private handleError(error: HttpErrorResponse, options?: HttpOptions) {
    if (!options?.withoutErrorMessage) {
      this.toastService.showErrorToast(options?.errorMessage || error?.error?.message || 'Internal server error');
    }

    return throwError(() => error);
  }

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

  get<T>(path: string, options?: HttpOptions, params?: Object): Observable<any> {
    return this.httpClient.get<IApiBaseResponse<T>>(
      `${this.url}/${path}`,
      {
        params: this.createParams(params),
        headers: this.getHeaders(options?.headers)
      }
    )
      .pipe(
        tap(
          () => options?.withoutSpinner || this.startSpinner(),
          () => options?.withoutSpinner || this.startSpinner()
        ),
        catchError((error: HttpErrorResponse) => this.handleError(error, options)),
        finalize(() => options?.withoutSpinner || this.stopSpinner())
      );
  }

  post<T>(path: string, data: any, options?: HttpOptions, params?: Object): Observable<any> {
    return this.httpClient.post<IApiBaseResponse<T>>(
      `${this.url}/${path}`,
      data,
      {
        params: this.createParams(params),
        headers: this.getHeaders(options?.headers)
      }
    )
      .pipe(
        tap(
          () => options?.withoutSpinner || this.startSpinner(),
          () => options?.withoutSpinner || this.startSpinner()
        ),
        catchError((error: HttpErrorResponse) => this.handleError(error, options)),
        finalize(() => options?.withoutSpinner || this.stopSpinner())
      );
  }

  put<T>(path: string, data: any, options?: HttpOptions, params?: Object): Observable<any> {
    return this.httpClient.put<IApiBaseResponse<T>>(
      `${this.url}/${path}`,
      data,
      {
        params: this.createParams(params),
        headers: this.getHeaders(options?.headers)
      }
    )
      .pipe(
        tap(
          () => options?.withoutSpinner || this.startSpinner(),
          () => options?.withoutSpinner || this.startSpinner()
        ),
        catchError((error: HttpErrorResponse) => this.handleError(error, options)),
        finalize(() => options?.withoutSpinner || this.stopSpinner())
      );
  }

  createParams(params?: Object) {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        httpParams = httpParams.append(key, value);
      });
    }
    return httpParams;
  }
}
