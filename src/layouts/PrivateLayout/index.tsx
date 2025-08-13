import React, { FC, ReactNode } from 'react';

import { AppShell, Stack } from '@mantine/core';

import { Header } from 'components';

interface PrivateLayoutProps {
  children: ReactNode;
}

const PrivateLayout: FC<PrivateLayoutProps> = ({ children }) => {
  return (
    <AppShell component={Stack} bg="white" header={{ height: 42 }}>
      <Header />

      <AppShell.Main bg="white" pt={0} mt={42}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default PrivateLayout;
