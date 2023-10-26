export interface ApiBaseResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
