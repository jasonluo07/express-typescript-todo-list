import mongoose, { Schema } from 'mongoose';
import { boolean, object, string } from 'zod';
import { ITodo } from '../types';

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }, // Add createdAt and updatedAt fields
);

export const todoSchemaValidator = object({
  title: string().min(1).max(50),
  isDone: boolean(),
});

export default mongoose.model<ITodo>('Todo', todoSchema);
