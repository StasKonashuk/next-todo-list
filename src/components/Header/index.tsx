'use client';

import React, { FC, memo, useCallback } from 'react';
import { AppShell, Button } from '@mantine/core';

import classes from './index.module.css';
import Text from 'components/Text';
import { redirect } from 'next/navigation';
import { RoutePath } from 'lib/constants';
import { useSignOutMutation } from 'services';

const Header: FC = () => {
  const [signOut] = useSignOutMutation();

  const handleSignOut = useCallback(async () => {
    const result = await signOut();

    if (result) {
      redirect(RoutePath.SignIn);
    }
  }, [signOut]);

  return (
    <AppShell.Header zIndex={300} className={classes.header}>
      <Text textColor="primary-white" fw="medium">
        Test Todo List App
      </Text>

      <Button onClick={handleSignOut}>Log out</Button>
    </AppShell.Header>
  );
};

export default memo(Header);
