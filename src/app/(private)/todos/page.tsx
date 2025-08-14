'use client';

import { ActionIcon, Button, Collapse, Group, Stack } from '@mantine/core';
import { FaChevronDown, FaTrash } from 'react-icons/fa';
import { FaChevronUp } from 'react-icons/fa';
import { useDisclosure } from '@mantine/hooks';
import { Text, Title } from 'components';
import { useAppSelector } from 'lib/hooks';

import classes from './index.module.css';
import { useDispatch } from 'react-redux';
import { removeTodoFromList, removeTodosList } from 'lib/features';
import { modals } from '@mantine/modals';
import { ModalId } from 'lib/enums';
import AddTodosListModal from './components/AddTodosListModal';
import { useCallback } from 'react';
import AddTodoModal from './components/AddTodoModal';
import { showNotification } from '@mantine/notifications';
import { TODO_STATUS_LABELS } from 'lib/constants';
import { Todo } from 'lib/features/todos/types';
import TodoModal from './components/TodoModal';

export default function Todos() {
  const dispatch = useDispatch();

  const todosLists = useAppSelector((state) => state.todos.todosLists);

  console.log({ todosLists });

  const [opened, { toggle }] = useDisclosure(true);

  const handleOpenTodo = useCallback((todo: Todo) => {
    modals.open({
      modalId: ModalId.Todo,
      title: `Todo Item ${todo.title}`,
      children: <TodoModal todoId={todo.id} />,
    });
  }, []);

  const handleCreateTodo = useCallback((listId: string) => {
    modals.open({
      modalId: ModalId.AddTodoToList,
      title: 'Add Todo',
      children: <AddTodoModal listId={listId} />,
    });
  }, []);

  const handleRemoveTodo = useCallback(
    (todoId: string) => {
      modals.openConfirmModal({
        modalId: ModalId.RemoveTodo,
        title: 'Remove Todo',
        children: <Text>Are you sure you want to remove this todo item?</Text>,
        onConfirm: () => {
          dispatch(removeTodoFromList({ todoId }));

          showNotification({
            title: 'Success',
            message: 'You have successfully removed todo item.',
            color: 'green',
          });
        },
        labels: { confirm: 'Yes', cancel: 'Cancel' },
      });
    },
    [dispatch],
  );

  const handleRemoveTodoList = useCallback(
    (listId: string) => {
      modals.openConfirmModal({
        modalId: ModalId.RemoveTodoList,
        title: 'Remove Todo List',
        children: <Text>Are you sure you want to remove this todo list?</Text>,
        onConfirm: () => {
          dispatch(removeTodosList({ listId }));

          showNotification({
            title: 'Success',
            message: 'You have successfully removed todo list.',
            color: 'green',
          });
        },
        labels: { confirm: 'Yes', cancel: 'Cancel' },
      });
    },
    [dispatch],
  );

  const displayedTodosLists = todosLists.map((todosList) => {
    const displayedTodos = todosList.todos.map((todo) => {
      return (
        <Group key={todo.id} className={classes.todoWrapper} onClick={() => handleOpenTodo(todo)}>
          <Group gap={6}>
            <Text>{todo.title}</Text>

            <Text>{TODO_STATUS_LABELS[todo.status]}</Text>
          </Group>

          <ActionIcon
            onClick={(e) => {
              e.stopPropagation();

              handleRemoveTodo(todo.id);
            }}
          >
            <FaTrash />
          </ActionIcon>
        </Group>
      );
    });

    return (
      <Stack key={todosList.id} flex={1}>
        <Group justify="space-between">
          <Text>{todosList.title}</Text>

          <Group>
            <Button variant="outline" onClick={() => handleCreateTodo(todosList.id)}>
              Add Todo
            </Button>

            <ActionIcon onClick={() => handleRemoveTodoList(todosList.id)}>
              <FaTrash />
            </ActionIcon>

            <ActionIcon onClick={toggle}>{opened ? <FaChevronDown /> : <FaChevronUp />}</ActionIcon>
          </Group>
        </Group>

        <Collapse in={opened}>
          <Stack>{displayedTodos}</Stack>
        </Collapse>
      </Stack>
    );
  });

  const handleAddTodosList = useCallback(() => {
    modals.open({
      modalId: ModalId.AddTodosList,
      title: 'Add Todos List',
      children: <AddTodosListModal />,
    });
  }, []);

  return (
    <Stack align="center" justify="center" px={20} py={100}>
      <Stack miw={700}>
        <Group justify="space-between">
          <Title>Todos</Title>

          <Button onClick={handleAddTodosList}>Add Todo List</Button>
        </Group>

        <Stack>{displayedTodosLists}</Stack>
      </Stack>
    </Stack>
  );
}
