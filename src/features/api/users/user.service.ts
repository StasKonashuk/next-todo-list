import db from 'lib/db';
import _ from 'lodash';
import { DATABASE_DOCUMENTS } from 'shared/constants';
import { userSchema } from 'shared/schemas';
import { User } from 'shared/types';

const service = db.createService<User>(DATABASE_DOCUMENTS.USERS, {
  schemaValidator: (obj) => userSchema.parseAsync(obj),
});

const createInitialUser = async () => {
  const user = await service.findOne({ email: 'test@gmail.com' });

  if (!user) {
    service.insertOne({
      email: 'test@gmail.com',
      passwordHash: '$2a$10$TJ1wz76Zq7SMJdOzCeeeL.BuWvNlYGbWTJ8fOWgEfGm9lqf7wplC6',
    });
  }
};

await createInitialUser();

const privateFields = ['passwordHash'];

const getPublic = (user: User | null) => _.omit(user, privateFields);

export default Object.assign(service, {
  getPublic,
});
