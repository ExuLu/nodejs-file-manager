import { rm } from 'fs/promises';
import infoAboutCurDir from './textInfo.js';
import addError from './error.js';
import { noArguments, notFile, wrongPath } from './errMessages.js';
import createPath from './createPath.js';

export default async function removeCommand(userArg) {
  if (userArg === '') {
    addError('input', noArguments);
  }
  const filePath = createPath(userArg);

  try {
    await rm(filePath);
    infoAboutCurDir();
  } catch (err) {
    if (err.code === 'ENOENT') addError('operation', wrongPath);
    else if (err.code === 'ERR_FS_EISDIR') addError('input', notFile);
    else addError();
  }
}
