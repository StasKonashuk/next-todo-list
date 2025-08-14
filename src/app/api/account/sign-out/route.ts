import { NextRequest, NextResponse } from 'next/server';
import attachCustomErrors from 'shared/api/middlewares/attach-custom-errors';
import { HttpCode } from 'shared/enums';
import { RequestContext } from 'shared/types';
import { cookiesUtils } from 'shared/utils';

export async function POST(req: NextRequest, ctx: RequestContext) {
  attachCustomErrors(req, ctx);

  await cookiesUtils.unsetTokens();

  return new NextResponse(JSON.stringify({ data: null }), {
    status: HttpCode.Ok,
    headers: { 'Content-Type': 'application/json' },
  });
}
