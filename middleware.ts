'use server';

import { COOKIES } from 'lib/constants';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { User } from 'lib/types';
import { securityUtils } from 'utils';

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(COOKIES.ACCESS_TOKEN);

  console.log({ accessToken });

  if (!accessToken) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const verifiedToken = await securityUtils.verifyJwtToken<User>(accessToken.value);

  if (!verifiedToken) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const res = NextResponse.next();

  const userId = verifiedToken._id;

  res.headers.set('x-user', userId);

  return NextResponse.next();
}

export const config = {
  // matcher: ['/api/account/'],
};
