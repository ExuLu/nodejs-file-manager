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

const noArguments = 'You need to enter arguments after command';
const notDir = 'You need enter path to a folder';
const wrongPath = 'Such directory or file does not exist';

async function cdCommand(userArg) {
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

function catCommand(userArg) {
  if (userArg === '') {
    addError('input', noArguments);
    return;
  }
  const filePath = userArg.includes('/Users') ? userArg : join(cwd(), userArg);
  const readStream = createReadStream(filePath, 'utf-8');
  let data = '';
  readStream.on('data', (chunk) => (data += chunk));
  readStream.on('end', () => {
    stdout.write(data + '\n');
    infoAboutCurDir();
  });
  readStream.on('error', (err) => {
    if (err.code === 'EISDIR') console.error('Invalid input');
    if (err.code === 'ENOENT') console.error('Operation failed');
    infoAboutCurDir();
  });
}

async function addCommand(userArg) {
  if (userArg.trim() === '') console.error('Invalid input');
  const filePath = userArg.includes('/Users') ? userArg : join(cwd(), userArg);

  try {
    await access(filePath);
    console.error('Operation failed');
  } catch (err) {
    if (err.code === 'ENOENT') {
      if (!userArg.includes('.') || userArg.indexOf('.') === userArg.length)
        console.error('Invalid input');
      else await writeFile(userArg, '');
    }
  }
  infoAboutCurDir();
}

async function renameCommand(userArg) {
  const userArgArray = userArg.split(' ');

  if (userArg.trim() === '' || !userArg.includes(' ')) {
    console.error('Invalid input');
    infoAboutCurDir();
    return;
  }

  const oldFilePath = userArgArray[0].includes('/Users')
    ? userArgArray[0]
    : join(cwd(), userArgArray[0]);
  const newFilePath = userArgArray[1].includes('/Users')
    ? userArgArray[1]
    : join(cwd(), userArgArray[1]);
  let newPathExist;

  try {
    await access(newFilePath);
    newPathExist = true;
  } catch (err) {
    newPathExist = false;
  }

  if (!newPathExist) {
    try {
      await access(oldFilePath);
      await rename(oldFilePath, newFilePath);
    } catch (err) {
      if (err.code === 'ENOENT') console.error('Operation failed');
    }
  } else {
    console.error('Operation failed');
  }

  infoAboutCurDir();
}

async function copyCommand(userArg) {
  const userArgArray = userArg.split(' ');

  if (userArg.trim() === '' || !userArg.includes(' ')) {
    console.error('Invalid input');
    infoAboutCurDir();
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

async function removeCommand(userArg) {
  if (userArg.trim() === '') console.error('Invalid input');
  const filePath = userArg.includes('/Users') ? userArg : join(cwd(), userArg);

  try {
    await rm(filePath);
  } catch (err) {
    if (err.code === 'ENOENT') console.error('Operation failed');
  }

  infoAboutCurDir();
}

async function moveCommand(userArg) {
  const userArgArray = userArg.split(' ');

  if (userArg.trim() === '' || !userArg.includes(' ')) {
    console.error('Invalid input');
    infoAboutCurDir();
    return;
  }

  const oldFilePath = userArgArray[0].includes('/Users')
    ? userArgArray[0]
    : join(cwd(), userArgArray[0]);

  const newDirPath = userArgArray[1].includes('/Users')
    ? userArgArray[1]
    : join(cwd(), userArgArray[1]);

  const fileName = oldFilePath.slice(oldFilePath.lastIndexOf('/') + 1);
  console.log(fileName);

  try {
    await access(oldFilePath);
  } catch (err) {
    console.error('Operation failed');
    infoAboutCurDir();
    return;
  }

  try {
    await access(newDirPath);
    const info = await stat(newDirPath);
    if (!info.isDirectory()) {
      console.error('Invalid input');
      infoAboutCurDir();
      return;
    }
    const newDirFiles = await readdir(newDirPath);
    if (newDirFiles.includes(fileName)) {
      console.error('Operation failed');
      infoAboutCurDir();
      return;
    }
  } catch (err) {
    console.error('Operation failed');
    infoAboutCurDir();
    return;
  }

  const originalFileStream = createReadStream(oldFilePath);
  const copyFileStream = createWriteStream(join(newDirPath, fileName));
  originalFileStream.pipe(copyFileStream);

  await rm(oldFilePath);

  infoAboutCurDir();
}

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
