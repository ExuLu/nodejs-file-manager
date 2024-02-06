import { stdout, stdin } from 'process';
import upCommand from './scripts/up.js';
import infoAboutCurDir from './scripts/textInfo.js';
import exitFromFileManager from './scripts/exit.js';
import lsCommand from './scripts/ls.js';
import cdCommand from './scripts/cd.js';
import catCommand from './scripts/cat.js';
import addCommand from './scripts/add.js';
import renameCommand from './scripts/rn.js';
import copyCommand from './scripts/cp.js';
import removeCommand from './scripts/rm.js';
import moveCommand from './scripts/mv.js';
import osInfo from './scripts/os.js';
import addError from './scripts/error.js';
import { noCommand } from './scripts/errMessages.js';
import hashCommand from './scripts/hash.js';
import compressCommand from './scripts/compress.js';
import decompressCommand from './scripts/decompress.js';
import goToHomeDir from './scripts/homeDir.js';

const args = process.argv.slice(2);

const username = args.reduce(
  (acc, arg) =>
    arg.includes('--username') ? arg.replace('--username=', '') : acc,
  ''
);

stdout.write(`Welcome to the File Manager, ${username} \n`);
goToHomeDir();
infoAboutCurDir();

stdin.on('data', async (data) => {
  const stringData = data.toString().trim();
  const command = stringData.slice(0, 3).trim();

  if (stringData === '.exit') exitFromFileManager(username);
  else if (command === 'up') upCommand();
  else if (command === 'cd') {
    const userArg = stringData.slice(3);
    await cdCommand(userArg);
  } else if (command === 'ls') await lsCommand();
  else if (command === 'cat') {
    const userArg = stringData.slice(4);
    catCommand(userArg);
  } else if (command === 'add') {
    const userArg = stringData.slice(4);
    await addCommand(userArg);
  } else if (command === 'rn') {
    const userArg = stringData.slice(3);
    await renameCommand(userArg);
  } else if (command === 'cp') {
    const userArg = stringData.slice(3);
    await copyCommand(userArg);
  } else if (command === 'rm') {
    const userArg = stringData.slice(3);
    await removeCommand(userArg);
  } else if (command === 'mv') {
    const userArg = stringData.slice(3);
    await moveCommand(userArg);
  } else if (command === 'os') {
    const userArg = stringData.slice(3);
    osInfo(userArg);
  } else if (stringData.slice(0, 4) === 'hash') {
    const userArg = stringData.slice(5);
    hashCommand(userArg);
  } else if (stringData.slice(0, 8) === 'compress') {
    const userArg = stringData.slice(9);
    compressCommand(userArg);
  } else if (stringData.slice(0, 10) === 'decompress') {
    const userArg = stringData.slice(11);
    decompressCommand(userArg);
  } else {
    addError('input', noCommand);
  }
});

process.on('SIGINT', () => exitFromFileManager(username));
