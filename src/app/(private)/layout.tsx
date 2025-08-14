'use client';

import { redirect, usePathname } from 'next/navigation';
import { Loader } from '@mantine/core';
import { PrivateLayout } from 'layouts';
import { RoutePath } from 'lib/constants';

import { useGetAccountQuery } from 'services';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: Readonly<LayoutProps>) => {
  const pathName = usePathname();

  const { data: accountResponse, isLoading: isAccountLoading } = useGetAccountQuery();

  if (!accountResponse && !isAccountLoading) {
    redirect(RoutePath.SignIn);
  }

  if (isAccountLoading) {
    return <Loader />;
  }

  if (accountResponse && !isAccountLoading && pathName === RoutePath.Home) {
    redirect(RoutePath.Todos);
  }

  return <PrivateLayout>{children}</PrivateLayout>;
};

export default Layout;
