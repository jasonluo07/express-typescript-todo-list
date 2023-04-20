import { Document } from 'mongoose';
import { StatusCodes as StatusCode } from 'http-status-codes';

export { StatusCode };

export enum ApiStatus {
  SUCCESS = 'Success',
  FAIL = 'Fail',
  ERROR = 'Error',
}

export interface ApiResponse<T> {
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
