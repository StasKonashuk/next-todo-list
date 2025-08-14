import { Button } from '@mantine/core';

import classes from './index.module.css';

export default Button.extend({
  defaultProps: {
    size: 'md',
  },
  classNames: {
    root: classes.root,
    section: classes.section,
    label: classes.label,
    loader: classes.loader,
  },
});
