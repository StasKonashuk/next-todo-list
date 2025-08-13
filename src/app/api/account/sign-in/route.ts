import { ApiHandler } from 'lib/types';
import { NextResponse } from 'next/server';

// @TODO: Add API Routes here
const signInHandler: ApiHandler = async (request) => {
  console.log({ request });

  return NextResponse.next();
};

export const POST = await signInHandler;
