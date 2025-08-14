'use-client';

import React, { FC, ReactNode } from 'react';
import { Text as MantineText, TextProps as MantineTextProps } from '@mantine/core';
import clsx from 'clsx';

import classes from './index.module.css';

export type TextProps = MantineTextProps & {
  type?: 'paragraph' | 'caption';
  size?: 'large' | 'base' | 'small';
  fw?: 'medium' | 'regular' | 'semibold';
  className?: string;
  children: ReactNode;
  textColor?: 'primary' | 'secondary' | 'primary-white';
};

const Text: FC<TextProps> = ({
  textColor = 'primary',
  type = 'paragraph',
  fw = 'regular',
  size = 'base',
  className,
  children,
  ...props
}) => (
  <MantineText
    className={clsx(
      classes[`${type}-${size}-${fw}`],
      {
        [classes.primary]: textColor === 'primary',
        [classes.secondary]: textColor === 'secondary',
        [classes.primaryWhite]: textColor === 'primary-white',
      },
      className,
    )}
    {...props}
  >
    {children}
  </MantineText>
);

export default Text;
