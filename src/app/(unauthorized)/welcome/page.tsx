'use client';

import { Button, Stack } from '@mantine/core';
import { Text, Title } from 'components';
import { RoutePath } from 'lib/constants';
import { setIsWelcomeScreenDisplayed } from 'lib/features';
import { redirect } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function Welcome() {
  const dispatch = useDispatch();

  const handleGoToSingIn = () => {
    dispatch(setIsWelcomeScreenDisplayed({ isWelcomeScreenDisplayed: true }));

    redirect(RoutePath.SignIn);
  };

  return (
    <Stack pt={154} gap={32}>
      <Title ta="center">Welcome to Todo List App</Title>

      <Text size="large" maw={400} ta="center">
        Organize your tasks, stay productive, and never forget what matters most.
      </Text>

      <Button onClick={handleGoToSingIn}>Go to Sign In</Button>
    </Stack>
  );
}
