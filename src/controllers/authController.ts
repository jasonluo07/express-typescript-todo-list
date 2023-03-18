import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import { ApiResponseStatuses } from '../types/apiResponse';
import respond from '../utils/apiResponse';

function signToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY ?? '', { expiresIn: '1h' });
}

async function register(req: Request, res: Response) {
  try {
    // 檢查是否已存在該電子郵件的使用者
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return respond(res, StatusCodes.BAD_REQUEST, ApiResponseStatuses.FAIL, req.t('EMAIL_ALREADY_REGISTERED'), null);
    }

    // 建立新的使用者
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user: IUser = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();

    // 簽發 token
    const token = signToken(user.id);

    return respond(res, StatusCodes.CREATED, ApiResponseStatuses.SUCCESS, req.t('USER_REGISTERED_SUCCESSFULLY'), {
      token,
      user,
    });
  } catch (err) {
    console.error(err);
    return respond(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ApiResponseStatuses.ERROR,
      req.t('FAILED_TO_REGISTER_USER'),
      null,
    );
  }
}

async function login(req: Request, res: Response) {
  try {
    // 檢查是否已存在該使用者
    const user: IUser | null = await User.findOne({ email: req.body.email });
    if (!user) {
      return respond(res, StatusCodes.UNAUTHORIZED, ApiResponseStatuses.FAIL, req.t('INVALID_EMAIL'), null);
    }

    // 檢查是否密碼正確
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return respond(res, StatusCodes.UNAUTHORIZED, ApiResponseStatuses.FAIL, req.t('INVALID_PASSWORD'), null);
    }

    // 簽發 token
    const token = signToken(user.id);

    return respond(res, StatusCodes.OK, ApiResponseStatuses.SUCCESS, req.t('USER_LOGGED_IN_SUCCESSFULLY'), {
      token,
      user,
    });
  } catch (err) {
    console.error(err);
    return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, ApiResponseStatuses.ERROR, req.t('FAILED_TO_LOG_IN'), null);
  }
}

export default { register, login };
