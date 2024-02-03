import addError from './error.js';
import createPath from './createPath.js';
import { stat } from 'fs/promises';
import { chdir } from 'process';
import infoAboutCurDir from './textInfo.js';
import { noArguments, notDir, wrongPath } from './errMessages.js';

export default async function cdCommand(userArg) {
  if (userArg === '') {
    addError('input', noArguments);
    return;
  }
  const newDirPath = createPath(userArg);

  try {
    const dirInfo = await stat(userArg);
    if (dirInfo.isFile()) {
      addError('input', notDir);
      return;
    }
    chdir(newDirPath);
    infoAboutCurDir();
  } catch (err) {
    if (err.code === 'ENOENT') {
      addError('operation', wrongPath);
    }
  }
}
