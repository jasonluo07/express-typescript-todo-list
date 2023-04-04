import mongoose, { Schema, Document } from 'mongoose';
import { object, string } from 'zod';

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

export interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export const userSchemaValidator = object({
  email: string().email(),
  password: string().min(8).max(20),
});

export default mongoose.model<IUser>('User', UserSchema);
