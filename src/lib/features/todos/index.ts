import { createSlice } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  name: string;
}

export interface TodosState {
  todosLists: Todo[];
}

const initialState: TodosState = {
  todosLists: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
});

export const { reducer: todosReducer } = todosSlice;
