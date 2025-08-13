import _ from 'lodash';

import db from 'lib/db';

import { DATABASE_DOCUMENTS } from 'lib/constants';
import { userSchema } from 'lib/schemas';
import { User } from 'lib/types';

const service = db.createService<User>(DATABASE_DOCUMENTS.USERS, {
  schemaValidator: (obj) => userSchema.parseAsync(obj),
});

const privateFields = ['passwordHash'];

const getPublic = (user: User | null) => _.omit(user, privateFields);

export default Object.assign(service, {
  getPublic,
});
