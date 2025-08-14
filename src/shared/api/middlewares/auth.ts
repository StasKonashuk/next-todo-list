'use server';

import { NextRequest } from 'next/server';
import { userService } from 'features/api/users';
import { COOKIES } from 'shared/constants';
import { HttpCode } from 'shared/enums';
import { RequestContext, User } from 'shared/types';
import { securityUtils } from 'shared/utils';

export const authMiddleware = async (req: NextRequest, context: RequestContext) => {
  const accessToken = req.cookies.get(COOKIES.ACCESS_TOKEN);

  if (!accessToken) {
    context.assertClientError!('Unauthorized', HttpCode.Unauthorized);

    return;
  }

  const verifiedToken = await securityUtils.verifyJwtToken<User>(accessToken.value);

  if (!verifiedToken) {
    context.assertClientError!('Unauthorized', HttpCode.Unauthorized);

    return;
  }

  const user = await userService.findOne({ _id: verifiedToken.userId });

  if (!user) {
    context.assertClientError!('Unauthorized', HttpCode.Unauthorized);

    return;
  }

  context.user = user;
};
