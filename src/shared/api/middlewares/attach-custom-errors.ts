import { NextResponse } from 'next/server';
import { HttpCode } from 'shared/enums';
import { ApiHandler } from 'shared/types';

const attachCustomErrors =
  async (handler: ApiHandler | Promise<ApiHandler>): Promise<ApiHandler> =>
  async (req, ctx) => {
    ctx.assertClientError = (error, status = HttpCode.BadRequest) =>
      new NextResponse(JSON.stringify({ error }), {
        status,
        headers: { 'Content-Type': 'application/json' },
      });

    return (await handler)(req, ctx);
  };

export default attachCustomErrors;
