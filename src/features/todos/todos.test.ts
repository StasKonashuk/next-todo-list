import { TodoStatus } from 'shared/enums';

import {
  addCommentToTodo,
  addTodosList,
  addTodoToList,
  editTodo,
  removeCommentFromTodo,
  removeTodoFromList,
  removeTodosList,
  todosReducer,
} from './todos.slice';

describe('todosSlice', () => {
  let initialState: ReturnType<typeof todosReducer>;

  beforeEach(() => {
    initialState = {
      todosLists: [
        {
          id: 'list-1',
          title: 'Test List',
          todos: [{ id: 'todo-1', title: 'Task 1', status: TodoStatus.Todo, createdOn: new Date().toISOString() }],
        },
      ],
    };
  });

  it('should add a new todo to a list', () => {
    const state = todosReducer(
      initialState,
      addTodoToList({
        listId: 'list-1',
        todo: { title: 'New Task', status: TodoStatus.Todo },
      }),
    );

    expect(state.todosLists[0].todos.length).toBe(2);
    expect(state.todosLists[0].todos[1].title).toBe('New Task');
  });

  it('should add a new todos list', () => {
    const state = todosReducer(initialState, addTodosList({ title: 'New List' }));

    expect(state.todosLists.length).toBe(2);
    expect(state.todosLists[1].title).toBe('New List');
  });

  it('should remove a todos list', () => {
    const state = todosReducer(initialState, removeTodosList({ listId: 'list-1' }));

    expect(state.todosLists.length).toBe(0);
  });

  it('should remove a todo from a list', () => {
    const state = todosReducer(initialState, removeTodoFromList({ todoId: 'todo-1' }));

    expect(state.todosLists[0].todos.length).toBe(0);
  });

  it('should edit a todo', () => {
    const state = todosReducer(initialState, editTodo({ todoId: 'todo-1', payload: { title: 'Updated Task' } }));

    expect(state.todosLists[0].todos[0].title).toBe('Updated Task');
  });

  it('should add a comment to a todo', () => {
    const state = todosReducer(initialState, addCommentToTodo({ todoId: 'todo-1', commentText: 'New Comment' }));

    expect(state.todosLists[0].todos[0].comments?.length).toBe(1);
    expect(state.todosLists[0].todos[0].comments?.[0].text).toBe('New Comment');
  });

  it('should remove a comment from a todo', () => {
    let state = todosReducer(initialState, addCommentToTodo({ todoId: 'todo-1', commentText: 'Comment to remove' }));

    const commentId = state.todosLists[0].todos[0].comments?.[0].id as string;

    state = todosReducer(state, removeCommentFromTodo({ todoId: 'todo-1', commentId }));

    expect(state.todosLists[0].todos[0].comments?.length).toBe(0);
  });

  it('should not fail when removing a non-existent todo', () => {
    const state = todosReducer(initialState, removeTodoFromList({ todoId: 'non-existent' }));

    expect(state.todosLists[0].todos.length).toBe(1);
  });

  it('should not fail when editing a non-existent todo', () => {
    const state = todosReducer(initialState, editTodo({ todoId: 'non-existent', payload: { title: 'X' } }));

    expect(state.todosLists[0].todos[0].title).toBe('Task 1');
  });

  it('should not fail when removing a comment from a todo with no comments', () => {
    const state = todosReducer(initialState, removeCommentFromTodo({ todoId: 'todo-1', commentId: 'non-existent' }));

    expect(state.todosLists[0].todos[0].comments).toBeUndefined();
  });

  it('should maintain order of todos when adding multiple todos', () => {
    let state = todosReducer(
      initialState,
      addTodoToList({ listId: 'list-1', todo: { title: 'Task 2', status: TodoStatus.Todo } }),
    );

    state = todosReducer(
      state,
      addTodoToList({ listId: 'list-1', todo: { title: 'Task 3', status: TodoStatus.Todo } }),
    );

    expect(state.todosLists[0].todos.map((t) => t.title)).toEqual(['Task 1', 'Task 2', 'Task 3']);
  });

  it('should add multiple comments to a todo', () => {
    let state = todosReducer(initialState, addCommentToTodo({ todoId: 'todo-1', commentText: 'Comment 1' }));

    state = todosReducer(state, addCommentToTodo({ todoId: 'todo-1', commentText: 'Comment 2' }));

    expect(state.todosLists[0].todos[0].comments?.length).toBe(2);
    expect(state.todosLists[0].todos[0].comments?.map((c) => c.text)).toEqual(['Comment 2', 'Comment 1']);
  });

  it('should handle adding a todo to a non-existent list gracefully', () => {
    const state = todosReducer(
      initialState,
      addTodoToList({ listId: 'non-existent-list', todo: { title: 'Task X', status: TodoStatus.Todo } }),
    );

    expect(state).toEqual(initialState);
  });

  it('should handle removing a todos list that does not exist', () => {
    const state = todosReducer(initialState, removeTodosList({ listId: 'non-existent-list' }));
    expect(state.todosLists.length).toBe(1);
  });
});
