export enum ApiResponseStatus {
  Success = 'success',
  Fail = 'fail',
  Error = 'error',
}

export interface ApiResponse<T> {
  code: number;
  status: ApiResponseStatus;
  message: string;
  data: T | null;
}
