import { join } from 'path';
import { chdir, cwd, stdin, stdout } from 'process';
import { readdir, stat, access, writeFile, rename, rm } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import upCommand from './scripts/up.js';
import infoAboutCurDir from './scripts/textInfo.js';
import exitFromFileManager from './scripts/exit.js';
import lsCommand from './scripts/ls.js';
import addError from './scripts/error.js';
import createPath from './scripts/createPath.js';
import cdCommand from './scripts/cd.js';
import {
  notFile,
  wrongPath,
  noArguments,
  exist,
} from './scripts/errMessages.js';
import catCommand from './scripts/cat.js';
import addCommand from './scripts/add.js';
import renameCommand from './scripts/rn.js';
import copyCommand from './scripts/cp.js';
import removeCommand from './scripts/rm.js';
import moveCommand from './scripts/mv.js';

// async function moveCommand(userArg) {
//   const userArgArray = userArg.split(' ');

//   if (userArg.trim() === '' || !userArg.includes(' ')) {
//     console.error('Invalid input');
//     infoAboutCurDir();
//     return;
//   }

//   const oldFilePath = userArgArray[0].includes('/Users')
//     ? userArgArray[0]
//     : join(cwd(), userArgArray[0]);

//   const newDirPath = userArgArray[1].includes('/Users')
//     ? userArgArray[1]
//     : join(cwd(), userArgArray[1]);

//   const fileName = oldFilePath.slice(oldFilePath.lastIndexOf('/') + 1);
//   console.log(fileName);

//   try {
//     await access(oldFilePath);
//   } catch (err) {
//     console.error('Operation failed');
//     infoAboutCurDir();
//     return;
//   }

//   try {
//     await access(newDirPath);
//     const info = await stat(newDirPath);
//     if (!info.isDirectory()) {
//       console.error('Invalid input');
//       infoAboutCurDir();
//       return;
//     }
//     const newDirFiles = await readdir(newDirPath);
//     if (newDirFiles.includes(fileName)) {
//       console.error('Operation failed');
//       infoAboutCurDir();
//       return;
//     }
//   } catch (err) {
//     console.error('Operation failed');
//     infoAboutCurDir();
//     return;
//   }

//   const originalFileStream = createReadStream(oldFilePath);
//   const copyFileStream = createWriteStream(join(newDirPath, fileName));
//   originalFileStream.pipe(copyFileStream);

//   await rm(oldFilePath);

//   infoAboutCurDir();
// }

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

  if (stringData === '.exit') exitFromFileManager(username);

  if (stringData === 'up') upCommand();

  if (stringData.includes('cd')) {
    const userArg = stringData.slice(3);
    await cdCommand(userArg);
  }

  if (stringData === 'ls') await lsCommand();

  if (stringData.includes('cat')) {
    const userArg = stringData.slice(4);
    catCommand(userArg);
  }

  if (stringData.includes('add')) {
    const userArg = stringData.slice(4);
    await addCommand(userArg);
  }

  if (stringData.includes('rn')) {
    const userArg = stringData.slice(3);
    await renameCommand(userArg);
  }

  if (stringData.includes('cp')) {
    const userArg = stringData.slice(3);
    await copyCommand(userArg);
  }

  if (stringData.includes('rm')) {
    const userArg = stringData.slice(3);
    await removeCommand(userArg);
  }

  if (stringData.includes('mv')) {
    const userArg = stringData.slice(3);
    await moveCommand(userArg);
  }
});

process.on('SIGINT', () => exitFromFileManager(username));
