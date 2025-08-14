import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { ModalId } from 'lib/enums';
import { addTodosList } from 'lib/features';
import { AddTodosListPayload } from 'lib/features/todos/types';
import { createTodosListSchema } from 'lib/schemas';
import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const AddTodosListModal: FC = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTodosListPayload>({ resolver: zodResolver(createTodosListSchema) });

  const handleCreateTodosList = useCallback(
    (data: AddTodosListPayload) => {
      dispatch(addTodosList(data));

      modals.close(ModalId.AddTodosList);

      showNotification({
        title: 'Success',
        message: 'You have successfully added todos list.',
        color: 'green',
      });
    },
    [dispatch],
  );

  return (
    <Stack>
      <form onSubmit={handleSubmit(handleCreateTodosList)}>
        <Stack gap={20}>
          <TextInput
            {...register('title')}
            label="Todos list title"
            placeholder="Enter todos list title"
            error={errors.title?.message}
          />
        </Stack>

        <Button type="submit" fullWidth mt={24}>
          Create
        </Button>
      </form>
    </Stack>
  );
};

export default AddTodosListModal;
