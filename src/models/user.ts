import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types';

const userSchema = new Schema(
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

export default mongoose.model<IUser>('User', userSchema);
