import { Database, IDocument, Service, ServiceOptions } from '@paralect/node-mongo';

const MONGO_URI = process.env.NEXT_API_MONGO_URI || '';
const MONGO_DB_NAME = process.env.NEXT_MONGO_DB_NAME;

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
