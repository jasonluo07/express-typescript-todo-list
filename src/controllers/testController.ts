import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiStatuses } from '../types/apiResponse';
import respond from '../utils/apiResponse';

function getHello(req: Request, res: Response, next: NextFunction) {
  try {
    return respond({
      res,
      code: StatusCodes.OK,
      status: ApiStatuses.SUCCESS,
      message: req.t('HELLO_WORLD'),
      data: null,
    });
  } catch (err) {
    return next(err);
  }
}

export default { getHello };
