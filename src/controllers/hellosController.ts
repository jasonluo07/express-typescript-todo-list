import { NextFunction, Request, Response } from 'express';

import { ApiStatus, StatusCode } from '../types';
import respond from '../utils';

function getHello(req: Request, res: Response, next: NextFunction): Response | void {
  try {
    return respond({
      res,
      code: StatusCode.OK,
      status: ApiStatus.SUCCESS,
      message: req.t('HELLO_WORLD'),
      data: null,
    });
  } catch (err) {
    return next(err);
  }
}

export default { getHello };
