import { boolean, object, string } from 'zod';

export const usersValidator = object({
  email: string().email(),
  password: string().min(8).max(20),
});

export const todosValidator = object({
  title: string().min(1).max(50),
  isDone: boolean(),
});
