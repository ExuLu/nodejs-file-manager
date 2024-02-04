import { join } from 'path';
import createPath from './createPath.js';
import { exist, noArguments, notFile, wrongPath } from './errMessages.js';
import addError from './error.js';
import { access } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import infoAboutCurDir from './textInfo.js';

export default async function compressCommand(userArg) {
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
  const archName = fileName.slice(0, fileName.lastIndexOf('.')) + '.br';
  const archPath = join(dirPath, archName);

  let fileExist;

  try {
    await access(archPath);
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

  try {
    const readStream = createReadStream(origFilePath, 'utf-8');
    const writeStream = createWriteStream(archPath);
    const brotli = createBrotliCompress();
    readStream.pipe(brotli).pipe(writeStream);
    infoAboutCurDir();
  } catch (err) {
    console.log('Error');
  }
}
