'use client';

import React, { FC, memo } from 'react';
import { AppShell, Button } from '@mantine/core';

import classes from './index.module.css';
import Text from 'components/Text';

const Header: FC = () => {
  return (
    <AppShell.Header zIndex={300} className={classes.header}>
      <Text textColor="primary-white" fw="medium">
        Test Todo List App
      </Text>

      <Button>Log out</Button>
    </AppShell.Header>
  );
};

export default memo(Header);
