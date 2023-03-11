import { Request, Response } from 'express';
import Todo, { ITodo } from '../models/todo';
import { ApiResponseStatus } from '../types/apiResponse';
import { respond } from '../utils/apiResponse';
import { StatusCodes } from 'http-status-codes';

// 取得所有 todos
export async function getAllTodos(_req: Request, res: Response) {
  try {
    const todos: ITodo[] = await Todo.find({});

    return respond(res, StatusCodes.OK, ApiResponseStatus.Success, 'Todos fetched successfully', todos);
  } catch (err) {
    console.error(err);
    return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, ApiResponseStatus.Error, 'Failed to fetch todos', null);
  }
}

// 建立新的 todo
export async function createNewTodo(req: Request, res: Response) {
  try {
    const newTodo: ITodo = new Todo({
      title: req.body.title,
      isDone: req.body.isDone,
    });
    await newTodo.save();

    return respond(res, StatusCodes.CREATED, ApiResponseStatus.Success, 'Todo created successfully', newTodo);
  } catch (err) {
    console.error(err);
    return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, ApiResponseStatus.Error, 'Failed to create todo', null);
  }
}

// 刪除所有 todos
export async function deleteAllTodos(_req: Request, res: Response) {
  await Todo.deleteMany({});
  try {
    return respond(res, StatusCodes.OK, ApiResponseStatus.Success, 'All todos deleted successfully', null);
  } catch (err) {
    console.error(err);
    return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, ApiResponseStatus.Error, 'Failed to delete todos', null);
  }
}

// 取得指定的 todo
export async function getTodoById(req: Request, res: Response) {
  try {
    const todo: ITodo | null = await Todo.findById(req.params.id);

    if (!todo) {
      return respond(res, StatusCodes.NOT_FOUND, ApiResponseStatus.Fail, 'Todo not found', null);
    }
    return respond(res, StatusCodes.OK, ApiResponseStatus.Success, 'Todo fetched successfully', todo);
  } catch (err) {
    console.error(err);
    return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, ApiResponseStatus.Error, 'Failed to fetch todo', null);
  }
}

// 更新指定的 todo
export async function updateTodoById(req: Request, res: Response) {
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
      return respond(res, StatusCodes.NOT_FOUND, ApiResponseStatus.Fail, 'Todo not found', null);
    }
    return respond(res, StatusCodes.OK, ApiResponseStatus.Success, 'Todo updated successfully', updatedTodo);
  } catch (err) {
    console.error(err);
    return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, ApiResponseStatus.Error, 'Failed to update todo', null);
  }
}

// 刪除指定的 todo
export async function deleteTodoById(req: Request, res: Response) {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return respond(res, StatusCodes.NOT_FOUND, ApiResponseStatus.Fail, 'Todo not found', null);
    }
    return respond(res, StatusCodes.OK, ApiResponseStatus.Success, 'Todo deleted successfully', deletedTodo);
  } catch (err) {
    console.error(err);
    return respond(res, StatusCodes.INTERNAL_SERVER_ERROR, ApiResponseStatus.Error, 'Failed to delete todo', null);
  }
}