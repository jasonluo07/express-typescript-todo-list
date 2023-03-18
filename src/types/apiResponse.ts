import { StatusCodes } from 'http-status-codes';

export enum ApiStatuses {
  SUCCESS = 'Success',
  FAIL = 'Fail',
  ERROR = 'Error',
}

export interface ApiResponse<T> {
  code: StatusCodes;
  status: ApiStatuses;
  message: string;
  data: T | null;
}
