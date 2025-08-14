'use client';

import { useEffect } from 'react';
import { redirect, usePathname } from 'next/navigation';
import { Loader } from '@mantine/core';
import { setAccount, useGetAccountQuery } from 'features/account';
import { useAppSelector } from 'lib/hooks';
import { useDispatch } from 'react-redux';
import { RoutePath } from 'shared/constants';
import { PrivateLayout } from 'shared/layouts';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: Readonly<LayoutProps>) => {
  const dispatch = useDispatch();
  const pathName = usePathname();

  const account = useAppSelector((store) => store.account);

  const { data: accountResponse, isLoading: isAccountLoading } = useGetAccountQuery();

  useEffect(() => {
    if (accountResponse) {
      dispatch(setAccount({ ...accountResponse, isAuthorized: true }));
    }
  }, [accountResponse]);

  if (!account && !isAccountLoading) {
    redirect(RoutePath.SignIn);
  }

  if (isAccountLoading) {
    return <Loader />;
  }

  if (account && !isAccountLoading && pathName === RoutePath.Home) {
    redirect(RoutePath.Todos);
  }

  return <PrivateLayout>{children}</PrivateLayout>;
};

export default Layout;
