import { StatusCodes } from 'http-status-codes';

export enum ApiResponseStatuses {
  SUCCESS = 'Success',
  FAIL = 'Fail',
  ERROR = 'Error',
}

export interface ApiResponse<T> {
  code: StatusCodes;
  status: ApiResponseStatuses;
  message: string;
  data: T | null;
}
