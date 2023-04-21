import { model, Schema } from 'mongoose';
import { ITodo } from '../types';

const todoSchema = new Schema<ITodo>(
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

export default model<ITodo>('Todo', todoSchema);
