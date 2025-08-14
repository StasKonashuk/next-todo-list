import { cookies } from 'next/headers';
import { COOKIES, TOKEN_SECURITY_EXPIRES_IN } from 'shared/constants';

import securityUtils from './security.util';

const unsetTokens = async () => {
  const cookieStore = await cookies();

  cookieStore.set({
    name: COOKIES.ACCESS_TOKEN,
    value: '',
    httpOnly: true,
    expires: new Date(0),
  });
};

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

const authUtils = {
  setTokens,
  unsetTokens,
};

export default authUtils;
