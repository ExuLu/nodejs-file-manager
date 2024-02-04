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

const args = process.argv.slice(2);

const username = args.reduce(
  (acc, arg) =>
    arg.includes('--username') ? arg.replace('--username=', '') : acc,
  ''
);

stdout.write(`Welcome to the File Manager, ${username} \n`);
infoAboutCurDir();

stdin.on('data', async (data) => {
  const stringData = data.toString().trim();
  const command = stringData.slice(0, 3).trim();

  if (stringData === '.exit') exitFromFileManager(username);

  if (command === 'up') upCommand();

  if (command === 'cd') {
    const userArg = stringData.slice(3);
    await cdCommand(userArg);
  }

  if (command === 'ls') await lsCommand();

  if (command === 'cat') {
    const userArg = stringData.slice(4);
    catCommand(userArg);
  }

  if (command === 'add') {
    const userArg = stringData.slice(4);
    await addCommand(userArg);
  }

  if (command === 'rn') {
    const userArg = stringData.slice(3);
    await renameCommand(userArg);
  }

  if (command === 'cp') {
    const userArg = stringData.slice(3);
    await copyCommand(userArg);
  }

  if (command === 'rm') {
    const userArg = stringData.slice(3);
    await removeCommand(userArg);
  }

  if (command === 'mv') {
    const userArg = stringData.slice(3);
    await moveCommand(userArg);
  }

  if (command === 'os') {
    const userArg = stringData.slice(3);
    osInfo(userArg);
  }
});

process.on('SIGINT', () => exitFromFileManager(username));
