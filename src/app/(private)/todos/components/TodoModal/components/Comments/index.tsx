import { FC, useCallback } from 'react';
import { ActionIcon, Button, Group, ScrollArea, Stack, Textarea, Tooltip } from '@mantine/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { addCommentToTodo, removeCommentFromTodo } from 'features';
import { TodoComment } from 'features/todos';
import { useForm } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addTodoCommentSchema } from 'shared/schemas';
import { AddTodoCommentParams } from 'shared/types';
import { Text } from 'shared/ui';

import classes from './index.module.css';

interface TodoCommentsProps {
  comments?: TodoComment[];
  todoId: string;
}

const TodoComments: FC<TodoCommentsProps> = ({ comments, todoId }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTodoCommentParams>({
    defaultValues: { text: '' },
    resolver: zodResolver(addTodoCommentSchema),
  });

  const handleRemoveTodoComment = useCallback(
    (commentId: string) => {
      dispatch(removeCommentFromTodo({ todoId, commentId }));
    },
    [dispatch, todoId],
  );

  const handleAddTodoComment = useCallback(
    (data: AddTodoCommentParams) => {
      dispatch(addCommentToTodo({ todoId, commentText: data.text }));

      reset();
    },
    [dispatch, todoId, reset],
  );

  const displayedComments = comments?.map(({ text, id }) => (
    <Group key={id} justify="space-between" w="100%">
      <Text>{text}</Text>

      <Tooltip label="Remove comment">
        <ActionIcon onClick={() => handleRemoveTodoComment(id)}>
          <FaTrash color="var(--color-text-error)" size={16} />
        </ActionIcon>
      </Tooltip>
    </Group>
  ));

  return (
    <Stack w="100%">
      <Stack w="100%" align="center" mih={200}>
        {Boolean(!comments?.length) && <Text>No comments</Text>}

        {Boolean(comments?.length) && (
          <ScrollArea h={200} w="100%">
            <Stack gap={16}>{displayedComments}</Stack>
          </ScrollArea>
        )}
      </Stack>

      <form onSubmit={handleSubmit(handleAddTodoComment)}>
        <Stack>
          <Textarea
            {...register('text')}
            placeholder="Enter todo comment"
            autosize
            minRows={2}
            maxRows={3}
            classNames={{ input: classes.textarea }}
            error={errors.text?.message}
          />

          <Button variant="primary" type="submit" fullWidth>
            Send Comment
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default TodoComments;
