import { z } from 'zod';

import { signInSchema, userSchema } from 'lib/schemas';

export type User = z.infer<typeof userSchema>;

export type SignInParams = z.infer<typeof signInSchema>;
