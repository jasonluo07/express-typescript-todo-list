import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiResponseStatus } from '../types/apiResponse';
import { respond } from '../utils/apiResponse';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
      };
    }
  }
}

interface IDecodedToken {
  userId: string;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return respond(res, StatusCodes.UNAUTHORIZED, ApiResponseStatus.Fail, 'No token provided', null);
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!) as IDecodedToken;
    req.user = { _id: decodedToken.userId };
    next();
  } catch (err) {
    console.error(err);
    return respond(res, StatusCodes.UNAUTHORIZED, ApiResponseStatus.Fail, 'Invalid token', null);
  }
}
