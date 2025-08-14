import { FC, useCallback } from 'react';
import { ActionIcon, Button, Collapse, Group, Stack, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { ModalId } from 'lib/enums';
import { removeTodoFromList, removeTodosList } from 'lib/features';
import { Todo, TodosList } from 'lib/features/todos/types';
import { FaChevronDown, FaChevronUp, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { Text } from 'components';

import AddTodoModal from '../AddTodoModal';
import TodoItem from '../Todo';
import TodoModal from '../TodoModal';

import classes from './index.module.css';

const TodosLists: FC<TodosList> = ({ id, todos, title }) => {
  const dispatch = useDispatch();

  const [opened, { toggle }] = useDisclosure(true);

  const handleCreateTodo = useCallback((listId: string) => {
    modals.open({
      modalId: ModalId.AddTodoToList,
      title: 'Add Task',
      children: <AddTodoModal listId={listId} />,
    });
  }, []);

  const handleOpenTodo = useCallback((todo: Todo) => {
    modals.open({
      modalId: ModalId.Todo,
      title: `Task ${todo.title}`,
      children: <TodoModal todoId={todo.id} />,
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
        confirmProps: {
          variant: 'primary',
          w: '100px',
          h: '36px',
        },
        cancelProps: {
          variant: 'outlined',
          w: '100px',
          h: '36px',
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
        confirmProps: {
          variant: 'primary',
          w: '100px',
          h: '36px',
        },
        cancelProps: {
          variant: 'outlined',
          w: '100px',
          h: '36px',
        },
        labels: { confirm: 'Yes', cancel: 'Cancel' },
      });
    },
    [dispatch],
  );

  const displayedTodos = todos.map((todo) => (
    <TodoItem onRemove={handleRemoveTodo} onOpen={handleOpenTodo} key={todo.id} {...todo} />
  ));

  return (
    <Stack className={classes.wrapper}>
      <Group justify="space-between">
        <Group>
          <Text fw="medium" size="large">
            {title}
          </Text>

          <Text textColor="secondary">{todos.length} Tasks</Text>
        </Group>

        <Group>
          <Button h={32} variant="outlined" size="md" onClick={() => handleCreateTodo(id)}>
            Add Task
          </Button>

          <Tooltip label="Remove task list">
            <ActionIcon onClick={() => handleRemoveTodoList(id)}>
              <FaTrash color="var(--color-text-error)" size={16} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label={opened ? 'Collapse' : 'Expand'}>
            <ActionIcon onClick={toggle}>
              {opened ? (
                <FaChevronDown size={16} color="var(--color-text-secondary)" />
              ) : (
                <FaChevronUp size={16} color="var(--color-text-secondary)" />
              )}
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>

      <Collapse in={opened} mt={opened ? 16 : 0}>
        <Stack>{displayedTodos}</Stack>
      </Collapse>
    </Stack>
  );
};

export default TodosLists;
