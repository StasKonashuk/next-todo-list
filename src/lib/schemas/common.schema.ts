import { z } from 'zod';

import { EMAIL_REGEX } from 'lib/constants';

export const emailSchema = (
  requiredError: string = 'Email is required',
  invalidError: string = 'Email format is incorrect',
) => z.string().toLowerCase().min(1, requiredError).regex(EMAIL_REGEX, invalidError);
