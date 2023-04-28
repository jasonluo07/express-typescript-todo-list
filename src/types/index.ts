import { Document } from 'mongoose';

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ApiStatus {
  SUCCESS = 'Success',
  FAIL = 'Fail',
  ERROR = 'Error',
}

export interface IApiResponse<T> {
  status: ApiStatus;
  message: string;
  data: T | null;
}

export interface IUser extends Document {
  email: string;
  password: string;
}

export interface ITodo extends Document {
  title: string;
  isDone: boolean;
}
