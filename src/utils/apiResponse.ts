import { Response } from 'express';

import { ApiResponseStatuses, ApiResponse } from '../types/apiResponse';

export default function respond<T>(
  res: Response,
  code: number,
  status: ApiResponseStatuses,
  message: string,
  data: T | null,
) {
  return res.status(code).json({ status, message, data } as ApiResponse<T>);
}
