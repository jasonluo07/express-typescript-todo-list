import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { ApiStatuses } from '../types/apiResponse';
import respond from '../utils/apiResponse';

function errorHandlingMiddleware(err: unknown, req: Request, res: Response, _next: NextFunction) {
  // Failed to validate request body
  if (err instanceof ZodError) {
    return respond(res, StatusCodes.BAD_REQUEST, ApiStatuses.ERROR, err.errors[0].message, null);
  }

  // Handle other unknown errors
  return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, ApiStatuses.ERROR, req.t('INTERNAL_SERVER_ERROR'), null);
}

export default errorHandlingMiddleware;
