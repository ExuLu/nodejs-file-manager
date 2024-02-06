import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import createPath from './createPath.js';
import addError from './error.js';
import { noArguments, notFile, wrongPath } from './errMessages.js';

export default async function hashCommand(userArg) {
  if (userArg === '') {
    addError('input', noArguments);
  }
  const filePath = createPath(userArg);

  try {
    const fileContent = await readFile(filePath, 'utf-8');
    const hash = createHash('sha256').update(fileContent).digest('hex');
    console.log(hash);
  } catch (err) {
    if (err.code === 'ENOENT') {
      addError('operation', wrongPath);
      return;
    }
    if (err.code === 'EISDIR') {
      addError('input', notFile);
      return;
    }
    addError();
  }
}
