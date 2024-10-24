import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_PATH, UPLOAD_PATH } from '../constants/path.js';
import { env } from 'node:process';

export const saveFileToUploadDir = async (file) => {
  await fs.rename(
    path.join(TEMP_PATH, file.filename),
    path.join(UPLOAD_PATH, file.filename),
  );

  return `${env('APP_DOMAIN')}/upload/${file.filename}`;
};
