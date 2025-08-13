import { NextRequest } from 'next/server';
import { User } from './user.types';

export interface RequestContext {
  user?: User;
}

export type ApiHandler = (req: NextRequest, context: RequestContext) => Promise<Response>;
