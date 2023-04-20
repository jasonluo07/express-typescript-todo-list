import { Request, Response, NextFunction } from 'express';
import { Todo } from '../models';
import { ApiStatus, ITodo, StatusCode } from '../types';
import { todosValidator } from '../validators';
import respond from '../utils';

// Get all todos
async function getAllTodos(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    // {} is the query condition, an empty object means to query all
    const todos: ITodo[] = await Todo.find({});

    return respond({
      res,
      code: StatusCode.OK,
      status: ApiStatus.SUCCESS,
      message: req.t('ALL_TODOS_FETCHED_SUCCESSFULLY'),
      data: todos,
    });
  } catch (err) {
    return next(err);
  }
}

// Create a new todo
async function createNewTodo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
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
  } catch (err) {
    return next(err);
  }
}

// Delete all todos
async function deleteAllTodos(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    // {} is the query condition, an empty object means to delete all
    await Todo.deleteMany({});

    return respond({
      res,
      code: StatusCode.OK,
      status: ApiStatus.SUCCESS,
      message: req.t('ALL_TODOS_DELETED_SUCCESSFULLY'),
      data: null,
    });
  } catch (err) {
    return next(err);
  }
}

// Get a todo by id
async function getTodoById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
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
  } catch (err) {
    return next(err);
  }
}

// Update a todo by id
async function updateTodoById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
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
  } catch (err) {
    return next(err);
  }
}

// Toggle the isDone field of the specified todo
async function toggleTodoById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
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
  } catch (err) {
    return next(err);
  }
}

// Delete a todo by id
async function deleteTodoById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
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
  } catch (err) {
    return next(err);
  }
}

export default {
  getAllTodos,
  createNewTodo,
  deleteAllTodos,
  getTodoById,
  updateTodoById,
  toggleTodoById,
  deleteTodoById,
};
