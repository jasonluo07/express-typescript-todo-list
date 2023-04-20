import mongoose, { Schema } from 'mongoose';
import { boolean, object, string } from 'zod';
import { ITodo } from '../types';

const TodoSchema = new Schema(
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
  { versionKey: false }, // Don't add __v field
);

export const todoSchemaValidator = object({
  title: string().min(1).max(50),
  isDone: boolean(),
});

export default mongoose.model<ITodo>('Todo', TodoSchema);
