'use client';

import React, { FC, memo, useCallback } from 'react';
import { redirect } from 'next/navigation';
import { AppShell, Button } from '@mantine/core';
import { RoutePath } from 'lib/constants';

import Text from 'components/Text';

import { useSignOutMutation } from 'services';

import classes from './index.module.css';

const Header: FC = () => {
  const [signOut] = useSignOutMutation();

  const handleSignOut = useCallback(async () => {
    const result = await signOut();

    if (result) {
      redirect(RoutePath.SignIn);
    }
  }, [signOut]);

  return (
    <AppShell.Header className={classes.header}>
      <Text textColor="primary-white" fw="medium">
        Test Todo List App
      </Text>

      <Button onClick={handleSignOut}>Log out</Button>
    </AppShell.Header>
  );
};

export default memo(Header);
