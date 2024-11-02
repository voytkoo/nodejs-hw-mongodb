import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { TEMP_PATH, UPLOAD_PATH } from './constants/path.js';
import { createDirIfNotExist } from './utils/createDirIfNotExist.js';

const bootstrap = async () => {
  await initMongoConnection();
  await createDirIfNotExist(TEMP_PATH);
  await createDirIfNotExist(UPLOAD_PATH);
  setupServer();
};

bootstrap();
