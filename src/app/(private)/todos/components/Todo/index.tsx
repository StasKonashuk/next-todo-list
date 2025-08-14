import { FC } from 'react';
import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { Todo } from 'features/todos';
import { FaTrash } from 'react-icons/fa';
import { TODO_STATUS_BACKGROUNDS, TODO_STATUS_LABELS } from 'shared/constants';
import { Text } from 'shared/ui';

import StatusBadge from '../StatusBadge';

import classes from './index.module.css';

interface TodoProps extends Todo {
  onOpen: (todo: Todo) => void;
  onRemove: (id: string) => void;
}

const TodoItem: FC<TodoProps> = (props) => {
  const { onOpen, onRemove, ...todo } = props;

  const { title, status, id } = todo;

  return (
    <Tooltip label="Click to open task details">
      <Group className={classes.todoWrapper} onClick={() => onOpen(todo)}>
        <Group gap={6}>
          <Text>{title}</Text>

          <StatusBadge label={TODO_STATUS_LABELS[status]} tooltip="Status" bg={TODO_STATUS_BACKGROUNDS[status]} />
        </Group>

        <Tooltip label="Remove task">
          <ActionIcon
            onClick={(e) => {
              e.stopPropagation();

              onRemove(id);
            }}
          >
            <FaTrash color="var(--color-text-error)" size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Tooltip>
  );
};

export default TodoItem;
