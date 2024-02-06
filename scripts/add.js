import addError from './error.js';
import { exist, noArguments, notFile } from './errMessages.js';
import createPath from './createPath.js';
import { access, writeFile } from 'fs/promises';
import infoAboutCurDir from './textInfo.js';

export default async function addCommand(userArg) {
  if (userArg === '') {
    addError('input', noArguments);
    return;
  }

  if (!userArg.includes('.') || userArg.indexOf('.') === userArg.length - 1) {
    addError('input', notFile);
    return;
  }
  const filePath = createPath(userArg);

  try {
    await access(filePath);
    addError('operation', exist);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await writeFile(userArg, '');
      infoAboutCurDir();
    } else addError();
  }
}
