import { PasswordInput } from '@mantine/core';
import cx from 'clsx';

import classes from './index.module.css';

export default PasswordInput.extend({
  defaultProps: {
    size: 'sm',
  },
  classNames: (_, props) => ({
    root: classes.root,
    wrapper: classes.inputWrapper,
    input: classes.input,
    innerInput: classes.innerInput,
    label: cx(classes.label, {
      [classes.labelError]: props.error,
    }),
    error: classes.error,
    required: classes.required,
    visibilityToggle: classes.visibilityToggle,
  }),
});
