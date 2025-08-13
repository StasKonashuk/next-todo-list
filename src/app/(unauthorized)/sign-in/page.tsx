'use client';

import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { Title } from 'components';
import { RoutePath } from 'lib/constants';
import { redirect } from 'next/navigation';
import { useCallback } from 'react';
import { useSignInMutation } from 'services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signInSchema } from 'lib/schemas';
import { ApiError, SignInParams } from 'lib/types';
import { showNotification } from '@mantine/notifications';

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInParams>({ resolver: zodResolver(signInSchema) });

  const [signIn, { isLoading }] = useSignInMutation();

  const handleSignIn = useCallback(
    async (data: SignInParams) => {
      const result = await signIn(data);

      if (result.data) {
        showNotification({
          title: 'Success',
          message: 'You have successfully logged in to the system.',
          color: 'green',
        });

        redirect(RoutePath.Todos);
      }

      if (result.error) {
        // @TODO: Check types
        showNotification({
          title: 'Error',
          message: (result.error as ApiError).data.error,
          color: 'red',
        });
      }
    },
    [signIn],
  );

  return (
    <Stack pt={154}>
      <Stack w={360} gap={32}>
        <Stack align="center">
          <Title size="h1">Login to account</Title>
        </Stack>

        <form onSubmit={handleSubmit(handleSignIn)}>
          <Stack gap={20}>
            <TextInput
              {...register('email')}
              label="Email Address"
              placeholder="Enter email address"
              error={errors.email?.message}
            />

            <PasswordInput
              {...register('password')}
              label="Password"
              placeholder="Enter password"
              error={errors.password?.message}
              type="password"
            />
          </Stack>

          <Button type="submit" loading={isLoading} fullWidth mt={32}>
            Sign in
          </Button>
        </form>
      </Stack>
    </Stack>
  );
}
