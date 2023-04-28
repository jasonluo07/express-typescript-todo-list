import { Request, Response } from 'express';

import { Todo } from '../models';
import { ApiStatus, ITodo, StatusCode } from '../types';
import { catchError, respond } from '../utils';
import { todosValidator } from '../validators';

// Get all todos
const getAllTodos = catchError(async (req: Request, res: Response): Promise<Response> => {
  // {} is the query condition, an empty object means to query all
  const todos: ITodo[] = await Todo.find({});

  return respond({
    res,
    code: StatusCode.OK,
    status: ApiStatus.SUCCESS,
    message: req.t('ALL_TODOS_FETCHED_SUCCESSFULLY'),
    data: todos,
  });
});

// Create a new todo
const createNewTodo = catchError(async (req: Request, res: Response): Promise<Response> => {
  // Validate request body with Zod
  const validatedData = todosValidator.parse(req.body);

  // Create a new todo
  const newTodo: ITodo = new Todo({
    title: validatedData.title,
    isDone: validatedData.isDone,
  });
  await newTodo.save();

  return respond({
    res,
    code: StatusCode.CREATED,
    status: ApiStatus.SUCCESS,
    message: req.t('ONE_TODO_CREATED_SUCCESSFULLY'),
    data: newTodo,
  });
});

// Delete all todos
const deleteAllTodos = catchError(async (req: Request, res: Response): Promise<Response> => {
  // {} is the query condition, an empty object means to delete all
  await Todo.deleteMany({});

  return respond({
    res,
    code: StatusCode.OK,
    status: ApiStatus.SUCCESS,
    message: req.t('ALL_TODOS_DELETED_SUCCESSFULLY'),
    data: null,
  });
});

// Get a todo by id
const getTodoById = catchError(async (req: Request, res: Response): Promise<Response> => {
  const todo: ITodo | null = await Todo.findById(req.params.id);

  if (!todo) {
    return respond({
      res,
      code: StatusCode.NOT_FOUND,
      status: ApiStatus.FAIL,
      message: req.t('TODO_NOT_FOUND'),
      data: null,
    });
  }
  return respond({
    res,
    code: StatusCode.OK,
    status: ApiStatus.SUCCESS,
    message: req.t('ONE_TODO_FETCHED_SUCCESSFULLY'),
    data: todo,
  });
});

// Update a todo by id
const updateTodoById = catchError(async (req: Request, res: Response): Promise<Response> => {
  // Validate request body with Zod
  const validatedData = todosValidator.parse(req.body);

  // Update a todo
  const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate(
    req.params.id,
    {
      title: validatedData.title,
      isDone: validatedData.isDone,
    },
    { new: true }, // Return the updated document instead of the original document
  );

  if (!updatedTodo) {
    return respond({
      res,
      code: StatusCode.NOT_FOUND,
      status: ApiStatus.FAIL,
      message: req.t('TODO_NOT_FOUND'),
      data: null,
    });
  }
  return respond({
    res,
    code: StatusCode.OK,
    status: ApiStatus.SUCCESS,
    message: req.t('ONE_TODO_UPDATED_SUCCESSFULLY'),
    data: updatedTodo,
  });
});

// Toggle the isDone field of the specified todo
const toggleTodoById = catchError(async (req: Request, res: Response): Promise<Response> => {
  const todo: ITodo | null = await Todo.findById(req.params.id);

  if (!todo) {
    return respond({
      res,
      code: StatusCode.NOT_FOUND,
      status: ApiStatus.FAIL,
      message: req.t('TODO_NOT_FOUND'),
      data: null,
    });
  }

  // Toggle the isDone field
  todo.isDone = !todo.isDone;
  await todo.save();

  return respond({
    res,
    code: StatusCode.OK,
    status: ApiStatus.SUCCESS,
    message: req.t('ONE_TODO_UPDATED_SUCCESSFULLY'),
    data: todo,
  });
});

// Delete a todo by id
const deleteTodoById = catchError(async (req: Request, res: Response): Promise<Response> => {
  const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(req.params.id);

  if (!deletedTodo) {
    return respond({
      res,
      code: StatusCode.NOT_FOUND,
      status: ApiStatus.FAIL,
      message: req.t('TODO_NOT_FOUND'),
      data: null,
    });
  }
  return respond({
    res,
    code: StatusCode.OK,
    status: ApiStatus.SUCCESS,
    message: req.t('ONE_TODO_DELETED_SUCCESSFULLY'),
    data: deletedTodo,
  });
});

// Search a todo by keyword
const searchTodoByWord = catchError(async (req: Request, res: Response): Promise<Response> => {
  // const validatedData = todosValidator.parse(req.body);
  // Find the target item
  const targetTodo: ITodo[] | null = await Todo.find({
    title: req.query.keyword,
  });

  if (!targetTodo) {
    return respond({
      res,
      code: StatusCode.NOT_FOUND,
      status: ApiStatus.FAIL,
      message: req.t('TODO_NOT_FOUND'),
      data: null,
    });
  }
  return respond({
    res,
    code: StatusCode.OK,
    status: ApiStatus.SUCCESS,
    message: req.t('ONE_TODO_FETCHED_SUCCESSFULLY'),
    data: targetTodo,
  });
});

export default {
  getAllTodos,
  createNewTodo,
  deleteAllTodos,
  getTodoById,
  updateTodoById,
  toggleTodoById,
  deleteTodoById,
  searchTodoByWord,
};
