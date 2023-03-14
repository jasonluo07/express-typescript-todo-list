import mongoose, { Schema, Document } from 'mongoose';

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
  { timestamps: true }, // 自動加入 createdAt 和 updatedAt 欄位
);

export interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export default mongoose.model<IUser>('User', UserSchema);
