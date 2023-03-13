export enum ApiResponseStatuses {
  SUCCESS = 'Success',
  FAIL = 'Fail',
  ERROR = 'Error',
}

export interface ApiResponse<T> {
  code: number;
  status: ApiResponseStatuses;
  message: string;
  data: T | null;
}
