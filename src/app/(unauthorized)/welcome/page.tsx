'use client';

import { redirect } from 'next/navigation';
import { Button, Stack } from '@mantine/core';
import { RoutePath } from 'lib/constants';
import { setIsWelcomeScreenHidden } from 'lib/features';
import { useDispatch } from 'react-redux';

import { Text, Title } from 'components';

const Welcome = () => {
  const dispatch = useDispatch();

  const handleGoToSingIn = () => {
    dispatch(setIsWelcomeScreenHidden({ isWelcomeScreenHidden: true }));

    redirect(RoutePath.SignIn);
  };

  return (
    <Stack pt={154} gap={32}>
      <Title ta="center">Welcome to Todo List App</Title>

      <Text size="large" maw={400} ta="center" textColor="secondary">
        Organize your tasks, stay productive, and never forget what matters most.
      </Text>

      <Button size="sm" variant="primary" onClick={handleGoToSingIn}>
        Go to Sign In
      </Button>
    </Stack>
  );
};

export default Welcome;
