import db from 'lib/db';
import _ from 'lodash';
import { DATABASE_DOCUMENTS } from 'shared/constants';
import { userSchema } from 'shared/schemas';
import { User } from 'shared/types';

const service = db.createService<User>(DATABASE_DOCUMENTS.USERS, {
  schemaValidator: (obj) => userSchema.parseAsync(obj),
});

const privateFields = ['passwordHash'];

const getPublic = (user: User | null) => _.omit(user, privateFields);

export default Object.assign(service, {
  getPublic,
});
