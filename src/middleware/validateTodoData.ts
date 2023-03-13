import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { todoSchemaValidator } from '../models/todo';
import { ApiResponseStatuses } from '../types/apiResponse';
import respond from '../utils/apiResponse';

export default function validateTodoData(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = todoSchemaValidator.parse(req.body);
    req.body = validatedData;
    return next();
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      return respond(res, StatusCodes.BAD_REQUEST, ApiResponseStatuses.FAIL, err.message, null);
    }
    return respond(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ApiResponseStatuses.ERROR,
      'Failed to validate todo data',
      null,
    );
  }
}
