import createPath from './createPath.js';
import { noArguments } from './errMessages.js';
import addError from './error.js';

export default async function compressCommand(userArg) {
  const userArgArray = userArg.split(' ');

  if (userArg.trim() === '' || userArgArray.length !== 2) {
    addError('input', noArguments);
    return;
  }

  const origFilePath = createPath(userArgArray[0]);
  const dirPath = createPath(userArgArray[1]);
  const fileName = origFilePath.slice(origFilePath.lastIndexOf('/') + 1);
  const archName = fileName.slice(fileName.lastIndexOf('.')) + '.br';
  console.log(archName);
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
}
