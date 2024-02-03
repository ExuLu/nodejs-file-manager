import { join } from 'path';
import infoAboutCurDir from './textInfo.js';
import { cwd } from 'process';
import { access } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import addError from './error.js';
import { noArguments } from './errMessages.js';

export default async function copyCommand(userArg) {
  const userArgArray = userArg.split(' ');

  if (userArg.trim() === '' || userArgArray.length !== 2) {
    addError('input', noArguments);
    return;
  }

  const origFilePath = userArgArray[0].includes('/Users')
    ? userArgArray[0]
    : join(cwd(), userArgArray[0]);

  const copyFilePath = userArgArray[1].includes('/Users')
    ? userArgArray[1]
    : join(cwd(), userArgArray[1]);

  try {
    await access(copyFilePath);
    console.error('Operation failed');
    infoAboutCurDir();
    return;
  } catch (err) {}

  try {
    await access(origFilePath);
  } catch (err) {
    console.error('Operation failed');
    infoAboutCurDir();
    return;
  }

  const originalFileStream = createReadStream(origFilePath, 'utf-8');
  const copyFileStream = createWriteStream(copyFilePath, 'utf-8');
  try {
    await pipeline(originalFileStream, copyFileStream);
    infoAboutCurDir();
  } catch (err) {
    console.error('Operation failed');
    infoAboutCurDir();
  }
}
