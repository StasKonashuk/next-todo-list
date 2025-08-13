import { HTTP_CODE } from 'lib/enums';
import { ApiHandler } from 'lib/types';
import { NextResponse } from 'next/server';

const attachCustomErrors = async (handler: ApiHandler | Promise<ApiHandler>): Promise<ApiHandler> => {
  return async (req, ctx) => {
    ctx.assertClientError = (error, status = HTTP_CODE.BAD_REQUEST) => {
      return new NextResponse(JSON.stringify({ error }), {
        status,
        headers: { 'Content-Type': 'application/json' },
      });
    };

    return (await handler)(req, ctx);
  };
};

export default attachCustomErrors;
