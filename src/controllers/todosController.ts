import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Todo, { ITodo } from '../models/todo';
import { ApiResponseStatuses } from '../types/apiResponse';
import respond from '../utils/apiResponse';

// 取得所有 todos
async function getAllTodos(req: Request, res: Response) {
  try {
    const todos: ITodo[] = await Todo.find({});

    return respond(res, StatusCodes.OK, ApiResponseStatuses.SUCCESS, req.t('ALL_TODOS_FETCHED_SUCCESSFULLY'), todos);
  } catch (err) {
    console.error(err);
    return respond(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ApiResponseStatuses.ERROR,
      req.t('FAILED_TO_FETCH_ALL_TODOS'),
      null,
    );
  }
}

// 建立新的 todo
async function createNewTodo(req: Request, res: Response) {
  try {
    const newTodo: ITodo = new Todo({
      title: req.body.title,
      isDone: req.body.isDone,
    });
    await newTodo.save();

    return respond(
      res,
      StatusCodes.CREATED,
      ApiResponseStatuses.SUCCESS,
      req.t('ONE_TODO_CREATED_SUCCESSFULLY'),
      newTodo,
    );
  } catch (err) {
    console.error(err);
    return respond(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ApiResponseStatuses.ERROR,
      req.t('FAILED_TO_CREATE_ONE_TODO'),
      null,
    );
  }
}

// 刪除所有 todos
async function deleteAllTodos(req: Request, res: Response) {
  try {
    await Todo.deleteMany({});
    return respond(res, StatusCodes.OK, ApiResponseStatuses.SUCCESS, req.t('ALL_TODOS_DELETED_SUCCESSFULLY'), null);
  } catch (err) {
    console.error(err);
    return respond(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ApiResponseStatuses.ERROR,
      req.t('FAILED_TO_DELETE_ALL_TODOS'),
      null,
    );
  }
}

// 取得指定的 todo
async function getTodoById(req: Request, res: Response) {
  try {
    const todo: ITodo | null = await Todo.findById(req.params.id);

    if (!todo) {
      return respond(res, StatusCodes.NOT_FOUND, ApiResponseStatuses.FAIL, req.t('TODO_NOT_FOUND'), null);
    }
    return respond(res, StatusCodes.OK, ApiResponseStatuses.SUCCESS, req.t('ONE_TODO_FETCHED_SUCCESSFULLY'), todo);
  } catch (err) {
    console.error(err);
    return respond(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ApiResponseStatuses.ERROR,
      req.t('FAILED_TO_FETCH_ONE_TODO'),
      null,
    );
  }
}

// 更新指定的 todo
async function updateTodoById(req: Request, res: Response) {
  try {
    const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        isDone: req.body.isDone,
      },
      { new: true }, // 回傳更新後的資料
    );

    if (!updatedTodo) {
      return respond(res, StatusCodes.NOT_FOUND, ApiResponseStatuses.FAIL, req.t('TODO_NOT_FOUND'), null);
    }
    return respond(
      res,
      StatusCodes.OK,
      ApiResponseStatuses.SUCCESS,
      req.t('ONE_TODO_UPDATED_SUCCESSFULLY'),
      updatedTodo,
    );
  } catch (err) {
    console.error(err);
    return respond(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ApiResponseStatuses.ERROR,
      req.t('FAILED_TO_UPDATE_ONE_TODO'),
      null,
    );
  }
}

// 刪除指定的 todo
async function deleteTodoById(req: Request, res: Response) {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return respond(res, StatusCodes.NOT_FOUND, ApiResponseStatuses.FAIL, req.t('TODO_NOT_FOUND'), null);
    }
    return respond(
      res,
      StatusCodes.OK,
      ApiResponseStatuses.SUCCESS,
      req.t('ONE_TODO_DELETED_SUCCESSFULLY'),
      deletedTodo,
    );
  } catch (err) {
    console.error(err);
    return respond(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ApiResponseStatuses.ERROR,
      'FAILED_TO_DELETE_ONE_TODO',
      null,
    );
  }
}

export default { getAllTodos, createNewTodo, deleteAllTodos, getTodoById, updateTodoById, deleteTodoById };
