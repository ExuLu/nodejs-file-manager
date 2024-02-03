import { join } from 'path';
import infoAboutCurDir from './textInfo.js';
import { cwd } from 'process';
import { access, readdir, rm, stat } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import addError from './error.js';
import { noArguments } from './errMessages.js';
import createPath from './createPath.js';
import copyCommand from './cp.js';

export default async function moveCommand(userArg) {
  copyCommand(userArg)
    .then((res) => {})
    .catch((err) => console.log(err));
}
