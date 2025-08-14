import { FC, useCallback } from 'react';
import { Button, Stack, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { zodResolver } from '@hookform/resolvers/zod';
import { addTodosList } from 'features';
import { AddTodosListPayload } from 'features/todos';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ModalId } from 'shared/enums';
import { createTodosListSchema } from 'shared/schemas';

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
        <Stack>
          <TextInput
            {...register('title')}
            label="Tasks list title"
            placeholder="Enter tasks list title"
            error={errors.title?.message}
          />
        </Stack>

        <Button variant="primary" type="submit" fullWidth mt={24}>
          Create Tasks List
        </Button>
      </form>
    </Stack>
  );
};

export default AddTodosListModal;
