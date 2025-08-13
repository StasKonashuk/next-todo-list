import { Database, IDocument, Service, ServiceOptions } from '@paralect/node-mongo';

// @TODO: Add envs
const MONGO_URI =
  'mongodb://root:root@localhost:27017/api-development?authSource=admin&replicaSet=rs&tls=false&directConnection=true';
const MONGO_DB_NAME = 'todos-test-app';

const database = new Database(MONGO_URI, MONGO_DB_NAME);

database.connect();

class CustomService<T extends IDocument> extends Service<T> {
  // You can add new methods or override existing here
}

function createService<T extends IDocument>(collectionName: string, options: ServiceOptions = {}) {
  return new CustomService<T>(collectionName, database, options);
}

export default Object.assign(database, {
  createService,
});
