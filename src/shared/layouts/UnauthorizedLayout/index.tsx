'use client';

import React, { FC, ReactNode } from 'react';
import { AppShell, Center, Stack } from '@mantine/core';
import { Header } from 'shared/ui';

interface UnauthorizedLayoutProps {
  children: ReactNode;
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = ({ children }) => (
  <AppShell component={Stack} header={{ height: 42 }}>
    <Header />

    <AppShell.Main bg="white" pt={0} mt={42}>
      <Center>{children}</Center>
    </AppShell.Main>
  </AppShell>
);

export default UnauthorizedLayout;
