export enum ApiStatuses {
  SUCCESS = 'Success',
  FAIL = 'Fail',
  ERROR = 'Error',
}

export interface ApiResponse<T> {
  status: ApiStatuses;
  message: string;
  data: T | null;
}
