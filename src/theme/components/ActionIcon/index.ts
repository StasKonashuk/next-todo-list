import { ActionIcon } from '@mantine/core';

import classes from './index.module.css';

export default ActionIcon.extend({
  defaultProps: {
    size: 'sm',
  },
  classNames: () => ({
    root: classes.root,
  }),
});
