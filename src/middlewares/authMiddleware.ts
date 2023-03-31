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

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return respond(res, StatusCodes.UNAUTHORIZED, ApiStatuses.FAIL, req.t('NO_TOKEN_PROVIDED'), null);
    }

    // 驗證 token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!) as IDecodedToken;

    // 將 userId 存入 req.user
    req.user = { id: decodedToken.userId };

    return next();
  } catch (err) {
    console.error(err);
    return respond(res, StatusCodes.UNAUTHORIZED, ApiStatuses.FAIL, req.t('INVALID_TOKEN'), null);
  }
}
