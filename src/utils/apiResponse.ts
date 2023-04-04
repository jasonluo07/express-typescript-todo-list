import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiStatuses, ApiResponse } from '../types/apiResponse';

interface ApiResponseOptions<T> {
  res: Response;
  code: StatusCodes;
  status: ApiStatuses;
  message: string;
  data: T | null;
}

export default function respond<T>({ res, code, status, message, data }: ApiResponseOptions<T>): Response {
  const apiResponse: ApiResponse<T> = { status, message, data };
  return res.status(code).json(apiResponse);
}
