import { NextRequest, NextResponse } from 'next/server';
import { userService } from 'features/api/users';
import attachCustomErrors from 'shared/api/middlewares/attach-custom-errors';
import { HttpCode } from 'shared/enums';
import { RequestContext } from 'shared/types';
import { cookiesUtils, securityUtils } from 'shared/utils';

export async function POST(req: NextRequest, ctx: RequestContext) {
  attachCustomErrors(req, ctx);

  const { email, password } = await req.json();

  const user = await userService.findOne({ email });

  if (!user || !user.passwordHash) {
    return ctx.assertClientError('The email or password you have entered is invalid');
  }

  const isPasswordMatch = await securityUtils.compareTextWithHash(password, user.passwordHash);

  if (!isPasswordMatch) {
    return ctx.assertClientError('The email or password you have entered is invalid');
  }

  await cookiesUtils.setTokens(user._id);

  return new NextResponse(JSON.stringify({ data: userService.getPublic(user) }), {
    status: HttpCode.Ok,
    headers: { 'Content-Type': 'application/json' },
  });
}
