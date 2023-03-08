import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  isDone: boolean;
}

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Todo = mongoose.model<ITodo>('Todo', TodoSchema);

export default Todo;
