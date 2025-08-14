import { TodoStatus } from 'lib/enums';
import z from 'zod';

export const createTodosListSchema = z.object({
  title: z.string().min(1, 'Title is required'),
});

export const addTodoToListSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
  status: z.enum(TodoStatus),
  dueDate: z.string().optional(),
});

export const editTodoSchema = addTodoToListSchema.partial();

export const addTodoCommentSchema = z.object({
  text: z.string().min(1, 'Comment is required').max(500),
});
