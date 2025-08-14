import { Textarea } from '@mantine/core';
import cx from 'clsx';

import inputClasses from '../TextInput/index.module.css';
import classes from './index.module.css';

export default Textarea.extend({
  defaultProps: {
    size: 'sm',
  },
  classNames: (_, props) => ({
    wrapper: classes.wrapper,
    input: classes.input,
    label: cx(inputClasses.label, {
      [inputClasses.labelError]: props.error,
    }),
    error: inputClasses.error,
    required: inputClasses.required,
  }),
});
