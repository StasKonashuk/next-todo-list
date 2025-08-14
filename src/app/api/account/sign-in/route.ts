import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { COOKIES, TOKEN_SECURITY_EXPIRES_IN } from 'lib/constants';
import { HttpCode } from 'lib/enums';
import attachCustomErrors from 'lib/middlewares/attach-custom-errors';
import { userService } from 'lib/resources/user';
import { ApiHandler } from 'lib/types';

import { securityUtils } from 'utils';

// @TODO: Move to utils
const setTokens = async (userId: string) => {
  const cookieStore = await cookies();

  const accessToken = await securityUtils.generateJwtToken({ userId });

  cookieStore.set({
    name: COOKIES.ACCESS_TOKEN,
    value: accessToken,
    httpOnly: true,
    expires: new Date(Date.now() + TOKEN_SECURITY_EXPIRES_IN * 1000),
  });
};

// @TODO: Add API Routes here
const signInHandler: ApiHandler = async (req, ctx) => {
  const { email, password } = await req.json();

  const user = await userService.findOne({ email });

  if (!user || !user.passwordHash) {
    return ctx.assertClientError('The email or password you have entered is invalid');
  }

  const isPasswordMatch = await securityUtils.compareTextWithHash(password, user.passwordHash);

  if (!isPasswordMatch) {
    return ctx.assertClientError('The email or password you have entered is invalid');
  }

  await setTokens(user._id);

  return new NextResponse(JSON.stringify({ data: userService.getPublic(user) }), {
    status: HttpCode.Ok,
    headers: { 'Content-Type': 'application/json' },
  });
};

// @TODO: Think about middleware merge fn
export const POST = await attachCustomErrors(signInHandler);
