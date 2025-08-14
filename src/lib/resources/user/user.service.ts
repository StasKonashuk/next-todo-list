import { DATABASE_DOCUMENTS } from 'lib/constants';
import db from 'lib/db';
import { userSchema } from 'lib/schemas';
import { User } from 'lib/types';
import _ from 'lodash';

const service = db.createService<User>(DATABASE_DOCUMENTS.USERS, {
  schemaValidator: (obj) => userSchema.parseAsync(obj),
});

const privateFields = ['passwordHash'];

const getPublic = (user: User | null) => _.omit(user, privateFields);

export default Object.assign(service, {
  getPublic,
});
