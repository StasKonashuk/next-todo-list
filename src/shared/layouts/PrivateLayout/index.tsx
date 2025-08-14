'use client';

import React, { FC, ReactNode } from 'react';
import { AppShell, ScrollArea, Stack } from '@mantine/core';
import { Header } from 'shared/ui';

interface PrivateLayoutProps {
  children: ReactNode;
}

const PrivateLayout: FC<PrivateLayoutProps> = ({ children }) => (
  <AppShell component={Stack} bg="white" header={{ height: 42 }}>
    <Header />

    <AppShell.Main bg="white" pt={42} mih="100vh">
      <ScrollArea.Autosize h="calc(100vh - 42px)">{children}</ScrollArea.Autosize>
    </AppShell.Main>
  </AppShell>
);

export default PrivateLayout;
