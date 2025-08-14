import { TextInput } from '@mantine/core';
import cx from 'clsx';

import classes from './index.module.css';

export default TextInput.extend({
  defaultProps: {
    size: 'sm',
    inputWrapperOrder: ['label', 'input', 'description', 'error'],
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
  }),
});
