import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import User, { IUser, userSchemaValidator } from '../models/user';
import { ApiStatuses } from '../types/apiResponse';
import respond from '../utils/apiResponse';

function signToken(userId: string): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY!, { expiresIn: '1d' });
}

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    // Validate request body with Zod
    const validatedData = userSchemaValidator.parse(req.body);

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return respond(res, StatusCodes.BAD_REQUEST, ApiStatuses.FAIL, req.t('EMAIL_ALREADY_REGISTERED'), null);
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);
    const user: IUser = new User({
      email: validatedData.email,
      password: hashedPassword,
    });
    await user.save();

    // Sign token
    const token = signToken(user.id);

    return respond(res, StatusCodes.CREATED, ApiStatuses.SUCCESS, req.t('USER_REGISTERED_SUCCESSFULLY'), {
      token,
      user,
    });
  } catch (err) {
    return next(err);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    // Validate request body with Zod
    const validatedData = userSchemaValidator.parse(req.body);

    // Check if user with the same email already exists
    const user: IUser | null = await User.findOne({ email: validatedData.email });
    if (!user) {
      return respond(res, StatusCodes.UNAUTHORIZED, ApiStatuses.FAIL, req.t('INVALID_EMAIL'), null);
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
    if (!isPasswordValid) {
      return respond(res, StatusCodes.UNAUTHORIZED, ApiStatuses.FAIL, req.t('INVALID_PASSWORD'), null);
    }

    // Sign token
    const token = signToken(user.id);

    return respond(res, StatusCodes.OK, ApiStatuses.SUCCESS, req.t('USER_LOGGED_IN_SUCCESSFULLY'), {
      token,
      user,
    });
  } catch (err) {
    return next(err);
  }
}

export default { register, login };
