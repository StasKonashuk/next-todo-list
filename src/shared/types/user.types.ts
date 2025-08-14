import { signInSchema, userSchema } from 'shared/schemas';
import { z } from 'zod';

export type User = z.infer<typeof userSchema>;

export type SignInParams = z.infer<typeof signInSchema>;
