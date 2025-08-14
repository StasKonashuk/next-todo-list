import { NextResponse } from 'next/server';
import attachCustomErrors from 'shared/api/middlewares/attach-custom-errors';
import { HttpCode } from 'shared/enums';
import { ApiHandler } from 'shared/types';
import { cookiesUtils } from 'shared/utils';

const signOutHandler: ApiHandler = async () => {
  await cookiesUtils.unsetTokens();

  return new NextResponse(JSON.stringify({ data: null }), {
    status: HttpCode.Ok,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST = await attachCustomErrors(signOutHandler);
