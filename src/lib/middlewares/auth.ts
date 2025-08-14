'use server';

import { COOKIES } from 'lib/constants';
import { HttpCode } from 'lib/enums';
import { userService } from 'lib/resources/user';
import { ApiHandler, User } from 'lib/types';

import { securityUtils } from 'utils';

export const authMiddleware =
  async (handler: ApiHandler): Promise<ApiHandler> =>
  async (req, context) => {
    const accessToken = req.cookies.get(COOKIES.ACCESS_TOKEN);

    if (!accessToken) {
      return context.assertClientError('Unauthorized', HttpCode.Unauthorized);
    }

    const verifiedToken = await securityUtils.verifyJwtToken<User>(accessToken.value);

    if (!verifiedToken) {
      return context.assertClientError('Unauthorized', HttpCode.Unauthorized);
    }

    const user = await userService.findOne({ _id: verifiedToken.userId });

    if (!user) {
      return context.assertClientError('Unauthorized', HttpCode.Unauthorized);
    }

    context.user = user;

    return handler(req, context);
  };
