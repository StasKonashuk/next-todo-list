import { FC, useCallback, useEffect, useState } from 'react';
import { Button, Group, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { TODO_STATUS_OPTIONS } from 'lib/constants';
import { ModalId } from 'lib/enums';
import { editTodo, removeTodoFromList } from 'lib/features';
import { Todo } from 'lib/features/todos/types';
import { editTodoSchema } from 'lib/schemas';
import { EditTodoParams } from 'lib/types';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Text } from 'components';

import { calcTimeLeft } from './helpers';

import classes from './index.module.css';

const TodoForm: FC<Todo> = ({ id, title, status, description, dueDate, createdOn }) => {
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(createdOn, dueDate));

  const dispatch = useDispatch();

  const [editMode, { toggle: toggleEditMode }] = useDisclosure();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calcTimeLeft(createdOn, dueDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [createdOn, dueDate]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTodoParams>({
    defaultValues: { title, status, description, dueDate },
    resolver: zodResolver(editTodoSchema),
  });

  const handleEditTodo = useCallback(
    (data: EditTodoParams) => {
      dispatch(editTodo({ todoId: id, payload: data }));

      modals.close(ModalId.Todo);

      showNotification({
        title: 'Success',
        message: 'You have successfully edited todo.',
        color: 'green',
      });
    },
    [dispatch, id],
  );

  const handleRemoveTodo = useCallback(() => {
    modals.openConfirmModal({
      modalId: ModalId.RemoveTodo,
      title: 'Remove Todo',
      children: <Text>Are you sure you want to remove this todo item?</Text>,
      onConfirm: () => {
        dispatch(removeTodoFromList({ todoId: id }));

        modals.close(ModalId.Todo);

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
  }, [dispatch, id]);

  return (
    <form onSubmit={handleSubmit(handleEditTodo)}>
      <Stack>
        <TextInput
          {...register('title')}
          disabled={!editMode}
          label="Todo title"
          placeholder="Enter todo title"
          error={errors.title?.message}
        />

        <Textarea
          {...register('description')}
          disabled={!editMode}
          label="Description"
          placeholder="Enter todo description"
          autosize
          minRows={2}
          maxRows={3}
          classNames={{ input: classes.textarea }}
          error={errors.description?.message}
        />

        <Controller
          control={control}
          name="status"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Select
              label="Status"
              disabled={!editMode}
              value={value}
              onChange={onChange}
              data={TODO_STATUS_OPTIONS}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="dueDate"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DatePickerInput
              disabled={!editMode}
              valueFormat="DD/MM/YYYY"
              label="Due date"
              placeholder="Pick due date"
              value={value}
              onChange={onChange}
              error={error?.message}
              minDate={dayjs().add(1, 'd').format('YYYY-MM-DD')}
            />
          )}
        />

        {timeLeft && (
          <Stack gap={8}>
            <Text fw="medium">Time left</Text>

            <Text fw="medium">{timeLeft}</Text>
          </Stack>
        )}
      </Stack>

      {!editMode && (
        <Stack mt={24}>
          <Button variant="primary" fullWidth onClick={() => toggleEditMode()}>
            Edit task
          </Button>

          <Button variant="destructive-outlined" fullWidth onClick={handleRemoveTodo}>
            Remove task
          </Button>
        </Stack>
      )}

      {editMode && (
        <Group mt={24} wrap="nowrap">
          <Button fullWidth variant="outlined" onClick={() => toggleEditMode()}>
            Cancel
          </Button>

          <Button variant="primary" type="submit" fullWidth>
            Save
          </Button>
        </Group>
      )}
    </form>
  );
};

export default TodoForm;
