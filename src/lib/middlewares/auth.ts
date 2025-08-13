'use server';

import { COOKIES } from 'lib/constants';
import { HTTP_CODE } from 'lib/enums';
import { User, ApiHandler } from 'lib/types';
import { NextResponse } from 'next/server';
import { securityUtils } from 'utils';

export const authMiddleware = async (handler: ApiHandler): Promise<ApiHandler> => {
  return async (req, context) => {
    console.log({ req });
    const accessToken = req.cookies.get(COOKIES.ACCESS_TOKEN);

    console.log({ accessToken });

    if (!accessToken) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: HTTP_CODE.UNAUTHORIZED,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const verifiedToken = await securityUtils.verifyJwtToken<User>(accessToken.value);

    if (!verifiedToken) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: HTTP_CODE.UNAUTHORIZED,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    context.user = { _id: verifiedToken._id, email: verifiedToken.email };

    return handler(req, context);
  };
};
