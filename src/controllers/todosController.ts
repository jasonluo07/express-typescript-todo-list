import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import Todo, { ITodo, todoSchemaValidator } from '../models/todo';
import { ApiStatuses } from '../types/apiResponse';
import respond from '../utils/apiResponse';

// Get all todos
async function getAllTodos(req: Request, res: Response) {
  try {
    // {} is the query condition, an empty object means to query all
    const todos: ITodo[] = await Todo.find({});

    return respond(res, StatusCodes.OK, ApiStatuses.SUCCESS, req.t('ALL_TODOS_FETCHED_SUCCESSFULLY'), todos);
  } catch (err) {
    console.error(err);
    return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, ApiStatuses.ERROR, req.t('FAILED_TO_FETCH_ALL_TODOS'), null);
  }
}

// Create a new todo
async function createNewTodo(req: Request, res: Response) {
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
    console.error(err);

    // Failed to validate request body
    if (err instanceof ZodError) {
      return respond(res, StatusCodes.BAD_REQUEST, ApiStatuses.FAIL, err.message, null);
    }
    return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, ApiStatuses.ERROR, req.t('FAILED_TO_CREATE_ONE_TODO'), null);
  }
}

// Delete all todos
async function deleteAllTodos(req: Request, res: Response) {
  try {
    await Todo.deleteMany({});

    return respond(res, StatusCodes.OK, ApiStatuses.SUCCESS, req.t('ALL_TODOS_DELETED_SUCCESSFULLY'), null);
  } catch (err) {
    console.error(err);
    return respond(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ApiStatuses.ERROR,
      req.t('FAILED_TO_DELETE_ALL_TODOS'),
      null,
    );
  }
}

// Get a todo by id
async function getTodoById(req: Request, res: Response) {
  try {
    const todo: ITodo | null = await Todo.findById(req.params.id);

    if (!todo) {
      return respond(res, StatusCodes.NOT_FOUND, ApiStatuses.FAIL, req.t('TODO_NOT_FOUND'), null);
    }
    return respond(res, StatusCodes.OK, ApiStatuses.SUCCESS, req.t('ONE_TODO_FETCHED_SUCCESSFULLY'), todo);
  } catch (err) {
    console.error(err);
    return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, ApiStatuses.ERROR, req.t('FAILED_TO_FETCH_ONE_TODO'), null);
  }
}

// Update a todo by id
async function updateTodoById(req: Request, res: Response) {
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
    console.error(err);

    // Failed to validate request body
    if (err instanceof ZodError) {
      return respond(res, StatusCodes.BAD_REQUEST, ApiStatuses.FAIL, err.message, null);
    }
    return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, ApiStatuses.ERROR, req.t('FAILED_TO_UPDATE_ONE_TODO'), null);
  }
}

// Toggle the isDone field of the specified todo
async function toggleTodoById(req: Request, res: Response) {
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
    console.error(err);
    return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, ApiStatuses.ERROR, req.t('FAILED_TO_UPDATE_ONE_TODO'), null);
  }
}

// Delete a todo by id
async function deleteTodoById(req: Request, res: Response) {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return respond(res, StatusCodes.NOT_FOUND, ApiStatuses.FAIL, req.t('TODO_NOT_FOUND'), null);
    }
    return respond(res, StatusCodes.OK, ApiStatuses.SUCCESS, req.t('ONE_TODO_DELETED_SUCCESSFULLY'), deletedTodo);
  } catch (err) {
    console.error(err);
    return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, ApiStatuses.ERROR, 'FAILED_TO_DELETE_ONE_TODO', null);
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
