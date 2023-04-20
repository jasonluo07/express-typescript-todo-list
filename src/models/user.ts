import mongoose, { Schema } from 'mongoose';
import { object, string } from 'zod';
import { IUser } from '../types';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }, // Add createdAt and updatedAt fields
);

export const userSchemaValidator = object({
  email: string().email(),
  password: string().min(8).max(20),
});

export default mongoose.model<IUser>('User', UserSchema);
