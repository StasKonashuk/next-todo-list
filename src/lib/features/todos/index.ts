import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoStatus } from 'lib/enums';
import { uniqueId } from 'lodash';

import {
  AddCommentToTodoPayload,
  AddTodosListPayload,
  AddTodoToListPayload,
  EditTodoInListPayload,
  RemoveCommentFromTodoPayload,
  RemoveTodoFromListPayload,
  RemoveTodosListPayload,
  TodosState,
} from './types';

const initialState: TodosState = {
  todosLists: [
    {
      id: uniqueId(),
      title: 'Test',
      todos: [{ id: uniqueId(), title: 'Task 1', status: TodoStatus.Todo, createdOn: new Date().toISOString() }],
    },
  ],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodoToList: (state, action: PayloadAction<AddTodoToListPayload>) => {
      const { listId, todo } = action.payload;

      const list = state.todosLists.find((l) => l.id === listId);

      if (list) {
        list.todos.push({ id: uniqueId(), createdOn: new Date().toISOString(), ...todo });
      }
    },

    addTodosList: (state, action: PayloadAction<AddTodosListPayload>) => {
      state.todosLists.push({ id: uniqueId(), todos: [], ...action.payload });
    },

    removeTodosList: (state, action: PayloadAction<RemoveTodosListPayload>) => {
      state.todosLists = state.todosLists.filter((list) => list.id !== action.payload.listId);
    },

    removeTodoFromList: (state, action: PayloadAction<RemoveTodoFromListPayload>) => {
      const { todoId } = action.payload;

      const list = state.todosLists.find((todos) => todos.todos.find((t) => t.id === todoId));

      if (list) {
        list.todos = list.todos.filter((t) => t.id !== todoId);
      }
    },

    editTodo: (state, action: PayloadAction<EditTodoInListPayload>) => {
      const { todoId, payload } = action.payload;

      state.todosLists = state.todosLists.map((list) => {
        const todo = list.todos.find((t) => t.id === todoId);

        if (todo) {
          return {
            ...list,
            todos: list.todos.map((t) => {
              if (t.id === todoId) {
                return {
                  ...t,
                  ...payload,
                };
              }

              return t;
            }),
          };
        }

        return list;
      });
    },

    addCommentToTodo: (state, action: PayloadAction<AddCommentToTodoPayload>) => {
      const { todoId, commentText } = action.payload;

      state.todosLists = state.todosLists.map((list) => {
        const todo = list.todos.find((t) => t.id === todoId);

        if (todo) {
          return {
            ...list,
            todos: list.todos.map((t) => {
              if (t.id === todoId) {
                return {
                  ...t,
                  comments: [{ id: uniqueId(), text: commentText }, ...(t.comments || [])],
                };
              }

              return t;
            }),
          };
        }

        return list;
      });
    },

    removeCommentFromTodo: (state, action: PayloadAction<RemoveCommentFromTodoPayload>) => {
      const { todoId, commentId } = action.payload;

      state.todosLists = state.todosLists.map((list) => {
        const todo = list.todos.find((t) => t.id === todoId);

        if (todo) {
          return {
            ...list,
            todos: list.todos.map((t) => {
              if (t.id === todoId) {
                return {
                  ...t,
                  comments: t.comments?.filter((c) => c.id !== commentId),
                };
              }

              return t;
            }),
          };
        }

        return list;
      });
    },
  },
});

export const {
  reducer: todosReducer,
  actions: {
    addTodoToList,
    addTodosList,
    removeTodoFromList,
    editTodo,
    removeTodosList,
    addCommentToTodo,
    removeCommentFromTodo,
  },
} = todosSlice;
