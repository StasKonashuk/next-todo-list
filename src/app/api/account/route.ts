import { NextResponse } from 'next/server';
import { HttpCode } from 'lib/enums';
import { authMiddleware } from 'lib/middlewares';
import attachCustomErrors from 'lib/middlewares/attach-custom-errors';
import { userService } from 'lib/resources/user';
import { ApiHandler } from 'lib/types';

const getAccountHandler: ApiHandler = async (request, ctx) => {
  const { user } = ctx;

  if (!user) {
    return ctx.assertClientError('Account not found', HttpCode.NotFound);
  }

  return new NextResponse(JSON.stringify({ data: userService.getPublic(user) }), {
    status: HttpCode.Ok,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const GET = await attachCustomErrors(authMiddleware(getAccountHandler));
