import { Select } from '@mantine/core';
import cx from 'clsx';

import classes from './index.module.css';

export default Select.extend({
  defaultProps: {
    size: 'sm',
    comboboxProps: {
      position: 'bottom-start',
    },
  },
  classNames: (_, props) => ({
    root: classes.root,
    wrapper: cx(classes.inputWrapper, { [classes.searchableSelect]: props.searchable }),
    input: classes.input,
    label: cx(classes.label, {
      [classes.labelError]: props.error,
    }),
    error: classes.error,
    required: classes.required,
    option: classes.option,
    dropdown: classes.dropdown,
    options: classes.options,
  }),
});
