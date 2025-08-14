import React, { FC, ReactNode } from 'react';
import { Title as MantineTitle, TitleOrder, TitleProps as MantineTitleProps } from '@mantine/core';
import clsx from 'clsx';

import classes from './index.module.css';

type TitleProps = MantineTitleProps & {
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  children: ReactNode;
  textColor?: 'primary' | 'secondary';
};

const TITLE_ORDERS: Record<string, TitleOrder> = {
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
  h6: 6,
};

const Title: FC<TitleProps> = ({ size = 'h1', className, textColor = 'primary', children, ...props }) => (
  <MantineTitle
    className={clsx(
      classes[size],
      {
        [classes.primary]: textColor === 'primary',
        [classes.secondary]: textColor === 'secondary',
      },
      className,
    )}
    order={TITLE_ORDERS[size]}
    size={size}
    {...props}
  >
    {children}
  </MantineTitle>
);

export default Title;
