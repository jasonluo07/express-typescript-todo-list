import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { ApiStatuses } from '../types/apiResponse';
import respond from '../utils/apiResponse';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
    };
  }
}

interface IDecodedToken {
  userId: string;
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction): Response | void {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return respond({
        res,
        code: StatusCodes.UNAUTHORIZED,
        status: ApiStatuses.FAIL,
        message: req.t('NO_TOKEN_PROVIDED'),
        data: null,
      });
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!) as IDecodedToken;

    // Store userId in req.user, so we can use req.user.id in the following controllers
    req.user = { id: decodedToken.userId };

    return next();
  } catch (err) {
    console.error(err);
    return respond({
      res,
      code: StatusCodes.UNAUTHORIZED,
      status: ApiStatuses.FAIL,
      message: req.t('INVALID_TOKEN'),
      data: null,
    });
  }
}
