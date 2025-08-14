import { addTodoCommentSchema, addTodoToListSchema, editTodoSchema } from 'lib/schemas';
import z from 'zod';

export type AddTodoToListParams = z.infer<typeof addTodoToListSchema>;
export type EditTodoParams = z.infer<typeof editTodoSchema>;
export type AddTodoCommentParams = z.infer<typeof addTodoCommentSchema>;
