'use client';

import { useCallback } from 'react';
import { Button, Group, Stack } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useAppSelector } from 'lib/hooks';
import { ModalId } from 'shared/enums';
import { Title } from 'shared/ui';

import AddTodosListModal from './components/AddTodosListModal';
import TodosLists from './components/TodosList';

const Todos = () => {
  const todosLists = useAppSelector((state) => state.todos.todosLists);

  const displayedTodosLists = todosLists.map((todosList) => <TodosLists key={todosList.id} {...todosList} />);

  const handleAddTodosList = useCallback(() => {
    modals.open({
      modalId: ModalId.AddTodosList,
      title: 'Add Tasks List',
      children: <AddTodosListModal />,
    });
  }, []);

  return (
    <Stack align="center" justify="center" px={20} py={100}>
      <Stack miw={700}>
        <Group justify="space-between">
          <Title>Tasks</Title>

          <Button variant="primary" size="md" h={32} onClick={handleAddTodosList}>
            Add Tasks List
          </Button>
        </Group>

        <Stack>{displayedTodosLists}</Stack>
      </Stack>
    </Stack>
  );
};

export default Todos;
