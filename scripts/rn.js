import addError from './error.js';
import { noArguments, notFile, exist, wrongPath } from './errMessages.js';
import createPath from './createPath.js';
import { access, rename } from 'fs/promises';
import infoAboutCurDir from './textInfo.js';

export default async function renameCommand(userArg) {
  const userArgArray = userArg.split(' ');

  if (userArg === '' || userArgArray.length !== 2) {
    console.log('This error');
    addError('input', noArguments);
    return;
  }

  const oldFilePath = createPath(userArgArray[0]);
  const newFilePath = createPath(userArgArray[1]);

  if (
    !oldFilePath.includes('.') ||
    !newFilePath.includes('.') ||
    oldFilePath.indexOf('.') === oldFilePath.length - 1 ||
    newFilePath.indexOf('.') === newFilePath.length - 1
  ) {
    addError('input', notFile);
    return;
  }
  let newPathExist;

  try {
    await access(newFilePath);
    newPathExist = true;
  } catch (err) {
    newPathExist = false;
  }

  if (newPathExist) {
    addError('operation', exist);
    return;
  }

  try {
    await access(oldFilePath);
    await rename(oldFilePath, newFilePath);
    infoAboutCurDir();
  } catch (err) {
    if (err.code === 'ENOENT') addError('operation', wrongPath);
  }
}
