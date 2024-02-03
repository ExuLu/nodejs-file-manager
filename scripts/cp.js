import { join } from 'path';
import infoAboutCurDir from './textInfo.js';
import { access } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import addError from './error.js';
import { exist, noArguments, notDir, wrongPath } from './errMessages.js';
import createPath from './createPath.js';
import { pipeline } from 'stream/promises';

export default async function copyCommand(userArg) {
  const userArgArray = userArg.split(' ');

  if (userArg.trim() === '' || userArgArray.length !== 2) {
    addError('input', noArguments);
    return;
  }

  const origFilePath = createPath(userArgArray[0]);
  const dirPath = createPath(userArgArray[1]);
  const fileName = origFilePath.slice(origFilePath.lastIndexOf('/') + 1);
  const copyFilePath = join(dirPath, fileName);

  let fileExist;

  try {
    await access(copyFilePath);
    fileExist = true;
  } catch (err) {
    fileExist = false;
  }

  if (fileExist) {
    addError('operation', exist);
    return;
  }

  try {
    await access(origFilePath);
  } catch (err) {
    addError('operation', wrongPath);
    return;
  }

  const originalFileStream = createReadStream(origFilePath, 'utf-8');
  const copyFileStream = createWriteStream(copyFilePath, 'utf-8');
  try {
    await pipeline(originalFileStream, copyFileStream);
    infoAboutCurDir();
  } catch (err) {
    if (err.code === 'ENOTDIR') {
      addError('input', notDir);
      return;
    }
    addError();
  }
}
