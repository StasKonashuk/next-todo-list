import { TodoStatus } from 'lib/enums';

export interface TodoComment {
  id: string;
  text: string;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  createdOn: string;
  dueDate?: string;
  comments?: TodoComment[];
}

interface TodosList {
  id: string;
  title: string;
  todos: Todo[];
}

export interface AddTodoToListPayload {
  listId: string;
  todo: Omit<Todo, 'id' | 'createdOn' | 'comments'>;
}

export interface AddTodosListPayload {
  title: string;
}

export interface RemoveTodoFromListPayload {
  todoId: string;
}

export interface EditTodoInListPayload {
  todoId: string;
  payload: Partial<Omit<Todo, 'id' | 'createdOn'>>;
}

export interface RemoveTodosListPayload {
  listId: string;
}

export interface AddCommentToTodoPayload {
  todoId: string;
  commentText: string;
}

export interface RemoveCommentFromTodoPayload {
  todoId: string;
  commentId: string;
}

export interface TodosState {
  todosLists: TodosList[];
}
