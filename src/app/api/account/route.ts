import { NextResponse } from 'next/server';
import { userService } from 'features/api/users';
import { authMiddleware } from 'shared/api/middlewares';
import attachCustomErrors from 'shared/api/middlewares/attach-custom-errors';
import { HttpCode } from 'shared/enums';
import { ApiHandler } from 'shared/types';

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

export async function GET() {
  await attachCustomErrors(authMiddleware(getAccountHandler));
}
