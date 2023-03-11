import { Response } from 'express';

import { ApiResponseStatus, ApiResponse } from '../types/apiResponse';

export function respond<T>(res: Response, code: number, status: ApiResponseStatus, message: string, data: T | null) {
  return res.status(code).json({ status, message, data } as ApiResponse<T>);
}
