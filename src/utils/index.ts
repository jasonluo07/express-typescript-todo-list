import { Response } from 'express';

import { ApiResponse, ApiStatus, StatusCode } from '../types';

interface ApiResponseOptions<T> {
  res: Response;
  code: StatusCode;
  status: ApiStatus;
  message: string;
  data: T | null;
}

export default function respond<T>({ res, code, status, message, data }: ApiResponseOptions<T>): Response {
  const apiResponse: ApiResponse<T> = { status, message, data };
  return res.status(code).json(apiResponse);
}
