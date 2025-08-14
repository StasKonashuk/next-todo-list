import { TodoStatus } from 'lib/enums';

export const TODO_STATUS_LABELS = {
  [TodoStatus.Todo]: 'TO DO',
  [TodoStatus.InProgress]: 'IN PROGRESS',
  [TodoStatus.Done]: 'DONE',
};

export const TODO_STATUS_BACKGROUNDS = {
  [TodoStatus.Todo]: 'var(--color-status-gray)',
  [TodoStatus.InProgress]: 'var(--color-status-blue-light)',
  [TodoStatus.Done]: 'var(--color-status-green)',
};

export const TODO_STATUS_OPTIONS = Object.values(TodoStatus).map((status) => ({
  value: status,
  label: TODO_STATUS_LABELS[status],
}));
