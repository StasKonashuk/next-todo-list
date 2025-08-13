'use client';

import { Loader } from '@mantine/core';
import { PrivateLayout } from 'layouts';
import { RoutePath } from 'lib/constants';
import { redirect, usePathname } from 'next/navigation';
import { useGetAccountQuery } from 'services';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
}
