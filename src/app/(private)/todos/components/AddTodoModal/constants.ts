import { TODO_STATUS_OPTIONS } from 'shared/constants';
import { ControlledFieldType } from 'shared/ui/ControlledField/enums';

export const FORM_FIELDS = [
  {
    type: ControlledFieldType.Input,
    label: 'Title',
    placeholder: 'Enter task title',
    inputName: 'title',
  },
  {
    type: ControlledFieldType.TextArea,
    label: 'Description',
    placeholder: 'Enter task description',
    inputName: 'description',
  },
  {
    type: ControlledFieldType.Select,
    label: 'Status',
    inputName: 'status',
    options: TODO_STATUS_OPTIONS,
  },
  {
    type: ControlledFieldType.DateInput,
    label: 'Due date',
    placeholder: 'Pick due date',
    inputName: 'dueDate',
  },
];
