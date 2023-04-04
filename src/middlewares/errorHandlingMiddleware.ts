import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { ApiStatuses } from '../types/apiResponse';
import respond from '../utils/apiResponse';

function errorHandlingMiddleware(err: unknown, req: Request, res: Response, _next: NextFunction): Response {
  // Failed to validate request body
  if (err instanceof ZodError) {
    return respond({
      res,
      code: StatusCodes.BAD_REQUEST,
      status: ApiStatuses.ERROR,
      message: err.errors[0].message,
      data: null,
    });
  }

  // Handle other unknown errors
  return respond({
    res,
    code: StatusCodes.INTERNAL_SERVER_ERROR,
    status: ApiStatuses.ERROR,
    message: req.t('INTERNAL_SERVER_ERROR'),
    data: null,
  });
}

export default errorHandlingMiddleware;
