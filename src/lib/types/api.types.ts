import { NextRequest, NextResponse } from 'next/server';
import { User } from './user.types';

export interface RequestContext {
  user?: User;
  assertClientError: (error: string, status?: number) => NextResponse;
}

export type ApiHandler = (req: NextRequest, context: RequestContext) => Promise<Response>;

export type ApiError = {
  data: {
    error: string;
  };
};
