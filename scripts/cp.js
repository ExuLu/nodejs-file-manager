import { join } from 'path';
import infoAboutCurDir from './textInfo.js';
import { access } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import addError from './error.js';
import {
  exist,
  noArguments,
  notDir,
  notFile,
  wrongPath,
} from './errMessages.js';
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
  if (
    !fileName.includes('.') ||
    fileName.indexOf('.') === fileName.length - 1
  ) {
    addError('input', notFile);
    return;
  }
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

  const originalFileStream = createReadStream(origFilePath);
  const copyFileStream = createWriteStream(copyFilePath);

  originalFileStream.on('error', (err) => {
    addError();
    return;
  });

  copyFileStream.on('error', (err) => {
    addError();
    return;
  });

  try {
    await pipeline(originalFileStream, copyFileStream);
    infoAboutCurDir();
  } catch (err) {
    if (err.code === 'ENOTDIR') {
      addError('input', notDir);
      return;
    }
    if (err.code === 'ENOENT') {
      addError('operation', wrongPath);
      return;
    }
    addError();
  }
}
