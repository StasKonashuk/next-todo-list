import { COOKIES } from 'lib/constants';
import { HTTP_CODE } from 'lib/enums';
import attachCustomErrors from 'lib/middlewares/attach-custom-errors';
import { ApiHandler } from 'lib/types';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// @TODO: Move to utils
const unsetTokens = async () => {
  const cookieStore = await cookies();

  cookieStore.set({
    name: COOKIES.ACCESS_TOKEN,
    value: '',
    httpOnly: true,
    expires: new Date(0),
  });
};

const signOutHandler: ApiHandler = async () => {
  await unsetTokens();

  return new NextResponse(JSON.stringify({ data: null }), {
    status: HTTP_CODE.OK,
    headers: { 'Content-Type': 'application/json' },
  });
};

// @TODO: Think about middleware merge fn
export const POST = await attachCustomErrors(signOutHandler);
