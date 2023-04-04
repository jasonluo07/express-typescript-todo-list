import mongoose, { Schema, Document } from 'mongoose';
import { boolean, object, string } from 'zod';

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

export interface ITodo extends Document {
  title: string;
  isDone: boolean;
}

export const todoSchemaValidator = object({
  title: string().min(1).max(50),
  isDone: boolean(),
});

export default mongoose.model<ITodo>('Todo', TodoSchema);
