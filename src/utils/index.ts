import { NextFunction, Request, Response } from 'express';

import { ApiResponse, ApiStatus, StatusCode } from '../types';

interface ApiResponseOptions<T> {
  res: Response;
  code: StatusCode;
  status: ApiStatus;
  message: string;
  data: T | null;
}

export function respond<T>({ res, code, status, message, data }: ApiResponseOptions<T>): Response {
  const apiResponse: ApiResponse<T> = { status, message, data };
  return res.status(code).json(apiResponse);
}

type RequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;

export function catchError(fn: RequestHandler) {
  return (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    return fn(req, res, next).catch(next);
  };
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
