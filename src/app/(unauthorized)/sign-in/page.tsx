'use client';

import { useCallback } from 'react';
import { redirect } from 'next/navigation';
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { zodResolver } from '@hookform/resolvers/zod';
import { setAccount, useSignInMutation } from 'features/account';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { RoutePath } from 'shared/constants';
import { signInSchema } from 'shared/schemas';
import { ApiError, SignInParams } from 'shared/types';
import { Title } from 'shared/ui';

const SignIn = () => {
  const dispatch = useDispatch();

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

        dispatch(setAccount({ ...result.data, isAuthorized: true }));

        redirect(RoutePath.Todos);
      }

      if (result.error) {
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
          <Stack>
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

          <Button variant="primary" size="sm" type="submit" loading={isLoading} fullWidth mt={32}>
            Sign in
          </Button>
        </form>
      </Stack>
    </Stack>
  );
};

export default SignIn;
