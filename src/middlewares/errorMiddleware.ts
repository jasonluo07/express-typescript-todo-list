import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { ApiStatus, StatusCode } from '../types';
import { respond } from '../utils';

function errorMiddleware(err: unknown, req: Request, res: Response, _next: NextFunction): Response {
  // Failed to validate request body
  if (err instanceof ZodError) {
    return respond({
      res,
      code: StatusCode.BAD_REQUEST,
      status: ApiStatus.ERROR,
      message: err.errors[0].message,
      data: null,
    });
  }

  // Handle other known errors
  if (err instanceof Error) {
    return respond({
      res,
      code: StatusCode.INTERNAL_SERVER_ERROR,
      status: ApiStatus.ERROR,
      message: err.message,
      data: null,
    });
  }

  // Handle other unknown errors
  return respond({
    res,
    code: StatusCode.INTERNAL_SERVER_ERROR,
    status: ApiStatus.ERROR,
    message: req.t('INTERNAL_SERVER_ERROR'),
    data: null,
  });
}

export default errorMiddleware;
