import addError from './error.js';
import createPath from './createPath.js';
import { createReadStream } from 'fs';
import { stdout } from 'process';
import infoAboutCurDir from './textInfo.js';
import { noArguments, notFile, wrongPath } from './errMessages.js';


export default function catCommand(userArg) {
  if (userArg === '') {
    addError('input', noArguments);
    return;
  }
  const filePath = createPath(userArg);
  const readStream = createReadStream(filePath);
  let data = '';
  readStream.on('data', (chunk) => (data += chunk));
  readStream.on('end', () => {
    stdout.write(data + '\n');
    infoAboutCurDir();
  });
  readStream.on('error', (err) => {
    if (err.code === 'EISDIR') addError('input', notFile);
    else if (err.code === 'ENOENT') addError('operation', wrongPath);
    else console.log(err);
  });
}
