'use client';

import { useCallback } from 'react';
import { ActionIcon, Button, Collapse, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { TODO_STATUS_LABELS } from 'lib/constants';
import { ModalId } from 'lib/enums';
import { removeTodoFromList, removeTodosList } from 'lib/features';
import { Todo } from 'lib/features/todos/types';
import { useAppSelector } from 'lib/hooks';
import { FaChevronDown, FaChevronUp, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { Text, Title } from 'components';

import AddTodoModal from './components/AddTodoModal';
import AddTodosListModal from './components/AddTodosListModal';
import TodoModal from './components/TodoModal';

import classes from './index.module.css';

const Todos = () => {
  const dispatch = useDispatch();

  const todosLists = useAppSelector((state) => state.todos.todosLists);

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
    const displayedTodos = todosList.todos.map((todo) => (
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
    ));

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
};

export default Todos;
