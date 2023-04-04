import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Todo, { ITodo, todoSchemaValidator } from '../models/todo';
import { ApiStatuses } from '../types/apiResponse';
import respond from '../utils/apiResponse';

// Get all todos
async function getAllTodos(req: Request, res: Response, next: NextFunction) {
  try {
    // {} is the query condition, an empty object means to query all
    const todos: ITodo[] = await Todo.find({});

    return respond(res, StatusCodes.OK, ApiStatuses.SUCCESS, req.t('ALL_TODOS_FETCHED_SUCCESSFULLY'), todos);
  } catch (err) {
    return next(err);
  }
}

// Create a new todo
async function createNewTodo(req: Request, res: Response, next: NextFunction) {
  try {
    // Validate request body with Zod
    const validatedData = todoSchemaValidator.parse(req.body);

    // Create a new todo
    const newTodo: ITodo = new Todo({
      title: validatedData.title,
      isDone: validatedData.isDone,
    });
    await newTodo.save();

    return respond(res, StatusCodes.CREATED, ApiStatuses.SUCCESS, req.t('ONE_TODO_CREATED_SUCCESSFULLY'), newTodo);
  } catch (err) {
    return next(err);
  }
}

// Delete all todos
async function deleteAllTodos(req: Request, res: Response, next: NextFunction) {
  try {
    await Todo.deleteMany({});

    return respond(res, StatusCodes.OK, ApiStatuses.SUCCESS, req.t('ALL_TODOS_DELETED_SUCCESSFULLY'), null);
  } catch (err) {
    return next(err);
  }
}

// Get a todo by id
async function getTodoById(req: Request, res: Response, next: NextFunction) {
  try {
    const todo: ITodo | null = await Todo.findById(req.params.id);

    if (!todo) {
      return respond(res, StatusCodes.NOT_FOUND, ApiStatuses.FAIL, req.t('TODO_NOT_FOUND'), null);
    }
    return respond(res, StatusCodes.OK, ApiStatuses.SUCCESS, req.t('ONE_TODO_FETCHED_SUCCESSFULLY'), todo);
  } catch (err) {
    return next(err);
  }
}

// Update a todo by id
async function updateTodoById(req: Request, res: Response, next: NextFunction) {
  try {
    // Validate request body with Zod
    const validatedData = todoSchemaValidator.parse(req.body);

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
      return respond(res, StatusCodes.NOT_FOUND, ApiStatuses.FAIL, req.t('TODO_NOT_FOUND'), null);
    }
    return respond(res, StatusCodes.OK, ApiStatuses.SUCCESS, req.t('ONE_TODO_UPDATED_SUCCESSFULLY'), updatedTodo);
  } catch (err) {
    return next(err);
  }
}

// Toggle the isDone field of the specified todo
async function toggleTodoById(req: Request, res: Response, next: NextFunction) {
  try {
    const todo: ITodo | null = await Todo.findById(req.params.id);

    if (!todo) {
      return respond(res, StatusCodes.NOT_FOUND, ApiStatuses.FAIL, req.t('TODO_NOT_FOUND'), null);
    }

    // Toggle the isDone field
    todo.isDone = !todo.isDone;
    await todo.save();

    return respond(res, StatusCodes.OK, ApiStatuses.SUCCESS, req.t('ONE_TODO_UPDATED_SUCCESSFULLY'), todo);
  } catch (err) {
    return next(err);
  }
}

// Delete a todo by id
async function deleteTodoById(req: Request, res: Response, next: NextFunction) {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return respond(res, StatusCodes.NOT_FOUND, ApiStatuses.FAIL, req.t('TODO_NOT_FOUND'), null);
    }
    return respond(res, StatusCodes.OK, ApiStatuses.SUCCESS, req.t('ONE_TODO_DELETED_SUCCESSFULLY'), deletedTodo);
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
