import { HTTP_CODE } from 'lib/enums';
import { authMiddleware } from 'lib/middlewares';
import attachCustomErrors from 'lib/middlewares/attach-custom-errors';
import { userService } from 'lib/resources/user';
import { ApiHandler } from 'lib/types';
import { NextResponse } from 'next/server';

const getAccountHandler: ApiHandler = async (request, ctx) => {
  const user = ctx.user;

  if (!user) {
    return ctx.assertClientError('Account not found', HTTP_CODE.NOT_FOUND);
  }

  return new NextResponse(JSON.stringify({ data: userService.getPublic(user) }), {
    status: HTTP_CODE.OK,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const GET = await attachCustomErrors(authMiddleware(getAccountHandler));
