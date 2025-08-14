import { FC, useCallback } from 'react';
import { Button, Stack } from '@mantine/core';
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { zodResolver } from '@hookform/resolvers/zod';
import { addTodoToList } from 'features';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ModalId, TodoStatus } from 'shared/enums';
import { addTodoToListSchema } from 'shared/schemas';
import { AddTodoToListParams } from 'shared/types';
import { ControlledField } from 'shared/ui';

import { FORM_FIELDS } from './constants';

interface AddTodoModalProps {
  listId: string;
}

const AddTodoModal: FC<AddTodoModalProps> = ({ listId }) => {
  const dispatch = useDispatch();

  const formMethods = useForm<AddTodoToListParams>({
    defaultValues: { title: '', status: TodoStatus.Todo },
    resolver: zodResolver(addTodoToListSchema),
  });

  const { handleSubmit } = formMethods;

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

  const displayedControlledFields = FORM_FIELDS.map((formField) => (
    <ControlledField key={formField.inputName} {...formField} />
  ));

  return (
    <Stack>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(handleCreateTodo)}>
          <Stack>{displayedControlledFields}</Stack>

          <Button variant="primary" size="md" type="submit" fullWidth mt={24}>
            Create Task
          </Button>
        </form>
      </FormProvider>
    </Stack>
  );
};

export default AddTodoModal;
