import { join } from 'path';
import createPath from './createPath.js';
import { exist, noArguments, notFile, wrongPath } from './errMessages.js';
import addError from './error.js';
import { access } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import infoAboutCurDir from './textInfo.js';

export default async function decompressCommand(userArg) {
  const userArgArray = userArg.split(' ');

  if (userArg.trim() === '' || userArgArray.length !== 2) {
    addError('input', noArguments);
    return;
  }

  const archivePath = createPath(userArgArray[0]);
  const dirPath = createPath(userArgArray[1]);
  const archiveName = archivePath.slice(archivePath.lastIndexOf('/') + 1);
  if (
    !archiveName.includes('.') ||
    archiveName.indexOf('.') === archiveName.length - 1
  ) {
    addError('input', notFile);
    return;
  }
  const decompressFileName =
    archiveName.slice(0, archiveName.lastIndexOf('.')) + '.txt';
  const decompressFilePath = join(dirPath, decompressFileName);

  let fileExist;

  try {
    await access(decompressFilePath);
    fileExist = true;
  } catch (err) {
    fileExist = false;
  }

  if (fileExist) {
    addError('operation', exist);
    return;
  }

  try {
    await access(archivePath);
  } catch (err) {
    addError('operation', wrongPath);
    return;
  }

  try {
    const readStream = createReadStream(archivePath);
    const writeStream = createWriteStream(decompressFilePath, 'utf-8');
    const brotli = createBrotliDecompress();
    readStream.pipe(brotli).pipe(writeStream);
    infoAboutCurDir();
  } catch (err) {
    console.log('Error');
  }
}
