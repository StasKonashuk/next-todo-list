import { NextRequest, NextResponse } from 'next/server';
import { HttpCode } from 'shared/enums';
import { RequestContext } from 'shared/types';

const attachCustomErrors = (req: NextRequest, ctx: RequestContext) => {
  ctx.assertClientError = (error: string, status = HttpCode.BadRequest) =>
    new NextResponse(JSON.stringify({ error }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
};

export default attachCustomErrors;
