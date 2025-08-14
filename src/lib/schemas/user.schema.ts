import { EMAIL_REGEX } from 'lib/constants';
import { z } from 'zod';

import { emailSchema } from './common.schema';
import dbSchema from './db.schema';

export const userSchema = dbSchema
  .extend({
    fullName: z.string().trim().min(1, 'Please enter Full name').max(40).optional().nullable(),

    email: z.string().toLowerCase().regex(EMAIL_REGEX, 'Email format is incorrect.'),
    passwordHash: z.string().nullable().optional(),
  })
  .strip();

export const signInSchema = z.object({
  email: emailSchema(),
  password: z.string().min(1, 'Password is required'),
});
