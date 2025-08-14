import { addTodoCommentSchema, addTodoToListSchema, editTodoSchema } from 'shared/schemas';
import z from 'zod';

export type AddTodoToListParams = z.infer<typeof addTodoToListSchema>;
export type EditTodoParams = z.infer<typeof editTodoSchema>;
export type AddTodoCommentParams = z.infer<typeof addTodoCommentSchema>;
