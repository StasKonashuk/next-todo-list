'use client';

import { redirect } from 'next/navigation';
import { Button, Stack } from '@mantine/core';
import { setIsWelcomeScreenHidden } from 'features';
import { useDispatch } from 'react-redux';
import { RoutePath } from 'shared/constants';
import { Text, Title } from 'shared/ui';

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

      <Button size="md" variant="primary" onClick={handleGoToSingIn}>
        Go to Sign In
      </Button>
    </Stack>
  );
};

export default Welcome;
