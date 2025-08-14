import { FC, useCallback } from 'react';
import { Button, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { TODO_STATUS_OPTIONS } from 'lib/constants';
import { ModalId, TodoStatus } from 'lib/enums';
import { addTodoToList } from 'lib/features';
import { addTodoToListSchema } from 'lib/schemas';
import { AddTodoToListParams } from 'lib/types';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import classes from './index.module.css';

interface AddTodoModalProps {
  listId: string;
}

const AddTodoModal: FC<AddTodoModalProps> = ({ listId }) => {
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTodoToListParams>({
    defaultValues: { status: TodoStatus.Todo },
    resolver: zodResolver(addTodoToListSchema),
  });

  const handleCreateTodo = useCallback(
    (data: AddTodoToListParams) => {
      dispatch(addTodoToList({ listId, todo: data }));

      modals.close(ModalId.AddTodoToList);

      showNotification({
        title: 'Success',
        message: 'You have successfully added todo.',
        color: 'green',
      });
    },
    [dispatch, listId],
  );

  return (
    <Stack>
      <form onSubmit={handleSubmit(handleCreateTodo)}>
        <Stack>
          <TextInput
            {...register('title')}
            label="Title"
            placeholder="Enter task title"
            error={errors.title?.message}
          />

          <Textarea
            {...register('description')}
            label="Description"
            placeholder="Enter task description"
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
        </Stack>

        <Button variant="primary" size="md" type="submit" fullWidth mt={24}>
          Create Task
        </Button>
      </form>
    </Stack>
  );
};

export default AddTodoModal;
