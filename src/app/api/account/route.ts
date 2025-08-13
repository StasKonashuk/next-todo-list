import { authMiddleware } from 'lib/middlewares';
import { ApiHandler } from 'lib/types';
import { NextResponse } from 'next/server';

// @TODO: Add API Routes here
const getAccountHandler: ApiHandler = async (request) => {
  console.log({ request });

  return NextResponse.next();
};

export const GET = await authMiddleware(getAccountHandler);
