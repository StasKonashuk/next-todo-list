import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { DatePickerInput } from '@mantine/dates';
import { TODO_STATUS_OPTIONS } from 'lib/constants';
import { ModalId, TodoStatus } from 'lib/enums';
import { addTodoToList } from 'lib/features';
import { addTodoToListSchema } from 'lib/schemas';
import { AddTodoToListParams } from 'lib/types';
import { FC, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import classes from './index.module.css';
import dayjs from 'dayjs';

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
        <Stack gap={20}>
          <TextInput
            {...register('title')}
            label="Title"
            placeholder="Enter todo title"
            error={errors.title?.message}
          />

          <Textarea
            {...register('description')}
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
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <Select
                  label="Status"
                  value={value}
                  onChange={onChange}
                  data={TODO_STATUS_OPTIONS}
                  error={error?.message}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="dueDate"
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <DatePickerInput
                  valueFormat="DD/MM/YYYY"
                  label="Due date"
                  placeholder="Pick due date"
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                  minDate={dayjs().add(1, 'd').format('YYYY-MM-DD')}
                />
              );
            }}
          />
        </Stack>

        <Button type="submit" fullWidth mt={24}>
          Create
        </Button>
      </form>
    </Stack>
  );
};

export default AddTodoModal;
