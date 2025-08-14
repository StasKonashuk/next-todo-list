import { FC, useCallback, useEffect, useState } from 'react';
import { Button, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { zodResolver } from '@hookform/resolvers/zod';
import { editTodo, removeTodoFromList } from 'features';
import { Todo } from 'features/todos';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ModalId } from 'shared/enums';
import { editTodoSchema } from 'shared/schemas';
import { EditTodoParams } from 'shared/types';
import { ControlledField, Text } from 'shared/ui';

import { FORM_FIELDS } from './constants';
import { calcTimeLeft } from './helpers';

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

  const formMethods = useForm<EditTodoParams>({
    defaultValues: { title, status, description, dueDate },
    resolver: zodResolver(editTodoSchema),
  });

  const { handleSubmit } = formMethods;

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

  const displayedControlledFields = FORM_FIELDS.map((formField) => (
    <ControlledField key={formField.inputName} disabled={!editMode} {...formField} />
  ));

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(handleEditTodo)}>
        <Stack>
          {displayedControlledFields}

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
    </FormProvider>
  );
};

export default TodoForm;
