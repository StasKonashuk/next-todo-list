'use client';

import { useEffect } from 'react';
import { redirect, usePathname } from 'next/navigation';
import { RoutePath } from 'lib/constants';
import { useAppSelector } from 'lib/hooks';

const WelcomeScreenGuard = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();

  const account = useAppSelector((store) => store.account);

  useEffect(() => {
    if (!account.isWelcomeScreenHidden && pathName !== RoutePath.Welcome) {
      redirect(RoutePath.Welcome);
    }
  }, [account.isWelcomeScreenHidden, pathName]);

  return children;
};

export default WelcomeScreenGuard;
