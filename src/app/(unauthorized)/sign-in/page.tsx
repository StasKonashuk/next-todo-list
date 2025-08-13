'use client';

import { Stack } from '@mantine/core';
import { Title } from 'components';
import { useAppSelector } from 'lib/hooks';
import { useGetAccountQuery } from 'services';

export default function SignIn() {
  const { data: accountResponse } = useGetAccountQuery(undefined);

  const account = useAppSelector((state) => state.account);

  console.log({ account, accountResponse });

  return (
    <Stack pt={154}>
      <Stack w={360} gap={32}>
        <Stack align="center">
          <Title size="h1">Login to account</Title>
        </Stack>
      </Stack>
    </Stack>
  );
}
