import { Response } from 'express';

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

export function respond<T>(res: Response, code: number, status: ApiResponseStatus, message: string, data: T | null) {
  return res.status(code).json({ status, message, data } as ApiResponse<T>);
}
