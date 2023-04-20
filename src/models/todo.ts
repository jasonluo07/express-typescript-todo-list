import mongoose, { Schema } from 'mongoose';
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

export default mongoose.model<ITodo>('Todo', todoSchema);
