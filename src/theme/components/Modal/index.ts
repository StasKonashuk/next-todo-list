import { Modal } from '@mantine/core';

import classes from './index.module.css';

export default Modal.extend({
  classNames: {
    content: classes.modalContent,
    header: classes.modalHeader,
    body: classes.modalBody,
    overlay: classes.overlay,
    close: classes.close,
    title: classes.title,
    inner: classes.inner,
  },
});
