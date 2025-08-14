import { EMAIL_REGEX } from 'lib/constants';
import { z } from 'zod';

export const emailSchema = (
  requiredError: string = 'Email is required',
  invalidError: string = 'Email format is incorrect',
) => z.string().toLowerCase().min(1, requiredError).regex(EMAIL_REGEX, invalidError);
