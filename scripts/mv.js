import { join } from 'path';
import infoAboutCurDir from './textInfo.js';
import { access, rm, stat } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import addError from './error.js';
import {
  noArguments,
  exist,
  wrongPath,
  notDir,
  notFile,
} from './errMessages.js';
import createPath from './createPath.js';
import { pipeline } from 'stream/promises';

export default async function moveCommand(userArg) {
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
    await access(dirPath);
  } catch (err) {
    addError('operation', wrongPath);
    return;
  }

  try {
    const stats = await stat(dirPath);
    if (!stats.isDirectory) throw Error('not dir');
  } catch (err) {
    addError('input', notDir);
    return;
  }

  try {
    await access(origFilePath);
  } catch (err) {
    addError('operation', wrongPath);
    return;
  }

  try {
    const stats = await stat(origFilePath);
    if (!stats.isFile()) throw Error('not file');
  } catch (err) {
    addError('input', notFile);
    return;
  }

  const originalFileStream = createReadStream(origFilePath);
  const copyFileStream = createWriteStream(copyFilePath);
  try {
    await pipeline(originalFileStream, copyFileStream);
    infoAboutCurDir();
  } catch (err) {
    if (err.code === 'ENOTDIR') {
      addError('input', notDir);
      return;
    } else if (err.code === 'ENOENT') {
      addError('operation', wrongPath);
      return;
    } else if (err.code === 'EISDIR') {
      addError('input', notFile);
      return;
    } else {
      addError();
      return;
    }
  }

  try {
    await rm(origFilePath);
  } catch (err) {
    addError();
  }
}
