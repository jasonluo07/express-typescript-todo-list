import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiStatuses } from '../types/apiResponse';
import respond from '../utils/apiResponse';

function getHello(req: Request, res: Response) {
  try {
    return respond(res, StatusCodes.OK, ApiStatuses.SUCCESS, req.t('HELLO_WORLD'), null);
  } catch (err) {
    console.error(err);
    return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, ApiStatuses.ERROR, req.t('FAILED_TO_FETCH_ALL_TODOS'), null);
  }
}

export default { getHello };
