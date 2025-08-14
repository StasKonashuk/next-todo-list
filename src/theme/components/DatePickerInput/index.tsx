import { DatePickerInput } from '@mantine/dates';
import cx from 'clsx';

import classes from './index.module.css';

export default DatePickerInput.extend({
  defaultProps: {
    size: 'sm',
    popoverProps: {
      classNames: {
        dropdown: classes.calendarDropdown,
      },
      position: 'bottom',
    },
  },
  classNames: (_, props) => ({
    root: classes.root,
    wrapper: classes.inputWrapper,
    input: classes.input,
    label: cx(classes.label, {
      [classes.labelError]: props.error,
    }),
    error: classes.error,
    required: classes.required,
    calendarHeader: classes.calendarHeader,
    calendarHeaderControl: classes.calendarHeaderControl,
    calendarHeaderLevel: classes.calendarHeaderLevel,
    month: classes.month,
    weekdaysRow: classes.weekdaysRow,
    weekday: classes.weekday,
    monthRow: classes.monthRow,
    monthCell: classes.monthCell,
    day: classes.datePickerDay,
    monthsListControl: classes.monthsListControl,
    monthsList: classes.monthsList,
    monthsListRow: classes.monthsListRow,
    yearsList: classes.yearsList,
    yearsListControl: classes.yearsListControl,
    yearsListRow: classes.yearsListRow,
  }),
});
