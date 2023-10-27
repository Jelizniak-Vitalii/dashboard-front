export interface IApiBaseResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ErrorResponse {
  status: number;
  message: string;
}
