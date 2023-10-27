import { Observable } from 'rxjs';

export type HttpOptions = {
  withoutSpinner?: boolean;
  withoutErrorMessage?: boolean;
  errorMessage?: string;
  headers?: { [key: string]: string };
}

export interface IApiBaseActions {
  get<T>(path: string, options: HttpOptions, params?: Object): Observable<any>;
  post<T>(path: string, data: any, options: HttpOptions, params?: Object): Observable<any>;
  put<T>(path: string, data: any, options: HttpOptions, params?: Object): Observable<any>;
}
