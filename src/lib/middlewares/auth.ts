'use server';

import { COOKIES } from 'lib/constants';
import { HTTP_CODE } from 'lib/enums';
import { userService } from 'lib/resources/user';
import { User, ApiHandler } from 'lib/types';
import { securityUtils } from 'utils';

export const authMiddleware = async (handler: ApiHandler): Promise<ApiHandler> => {
  return async (req, context) => {
    const accessToken = req.cookies.get(COOKIES.ACCESS_TOKEN);

    if (!accessToken) {
      return context.assertClientError('Unauthorized', HTTP_CODE.UNAUTHORIZED);
    }

    const verifiedToken = await securityUtils.verifyJwtToken<User>(accessToken.value);

    if (!verifiedToken) {
      return context.assertClientError('Unauthorized', HTTP_CODE.UNAUTHORIZED);
    }

    const user = await userService.findOne({ _id: verifiedToken.userId });

    if (!user) {
      return context.assertClientError('Unauthorized', HTTP_CODE.UNAUTHORIZED);
    }

    context.user = user;

    return handler(req, context);
  };
};
