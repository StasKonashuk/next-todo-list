import { Stack } from '@mantine/core';
import { FC } from 'react';

import TodoTabs from './components/Tabs';
import { useAppSelector } from 'lib/hooks';

interface TodoModalProps {
  todoId: string;
}

const TodoModal: FC<TodoModalProps> = ({ todoId }) => {
  const todosLists = useAppSelector((state) =>
    state.todos.todosLists.find((list) => list.todos.find((t) => t.id === todoId)),
  );

  const todo = todosLists?.todos.find((t) => t.id === todoId);

  if (!todo) {
    return null;
  }

  return (
    <Stack>
      <TodoTabs {...todo} />
    </Stack>
  );
};

export default TodoModal;
