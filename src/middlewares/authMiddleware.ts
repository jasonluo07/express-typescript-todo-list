import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { ApiStatus, StatusCode } from '../types';
import respond from '../utils';

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
        code: StatusCode.UNAUTHORIZED,
        status: ApiStatus.FAIL,
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
      code: StatusCode.UNAUTHORIZED,
      status: ApiStatus.FAIL,
      message: req.t('INVALID_TOKEN'),
      data: null,
    });
  }
}
