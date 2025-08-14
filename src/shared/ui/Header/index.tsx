'use client';

import React, { FC, memo, useCallback } from 'react';
import { redirect } from 'next/navigation';
import { AppShell, Button } from '@mantine/core';
import { logout, useSignOutMutation } from 'features/account';
import { useAppSelector } from 'lib/hooks';
import { useDispatch } from 'react-redux';
import { RoutePath } from 'shared/constants';
import Text from 'shared/ui/Text';

import classes from './index.module.css';

const Header: FC = () => {
  const dispatch = useDispatch();

  const [signOut] = useSignOutMutation();

  const account = useAppSelector((store) => store.account);

  const handleSignOut = useCallback(async () => {
    const result = await signOut();

    if (result) {
      dispatch(logout());

      redirect(RoutePath.SignIn);
    }
  }, [signOut]);

  return (
    <AppShell.Header className={classes.header}>
      <Text textColor="primary-white" fw="medium">
        Test Todo List App
      </Text>

      {account.isAuthorized && (
        <Button size="sm" variant="primary" h={26} onClick={handleSignOut}>
          Log out
        </Button>
      )}
    </AppShell.Header>
  );
};

export default memo(Header);
