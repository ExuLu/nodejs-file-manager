import { join } from 'path';
import { chdir, cwd, stdin, stdout } from 'process';
import { readdir } from 'fs/promises';

function exitFromFileManager() {
  stdout.write(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit();
}
function infoAboutCurDir() {
  stdout.write(`You are currently in ${cwd()} \n`);
}
function upCommand() {
  const upDirPath = cwd().slice(0, cwd().lastIndexOf('/'));
  try {
    chdir(upDirPath);
  } catch (err) {}
  infoAboutCurDir();
}

function cdCommand(stringData) {
  const userArg = stringData.slice(3);
  if (userArg.trim() === '') console.error('Invalid input');
  const newDirPath = userArg.includes('/Users')
    ? userArg
    : join(cwd(), userArg);
  try {
    chdir(newDirPath);
  } catch (err) {
    if (err.code === 'ENOENT') console.error('Operation failed');
  }

  infoAboutCurDir();
}
async function lsCommand() {
  const subDirs = await readdir(cwd());
  console.log(subDirs);
}

const args = process.argv.slice(2);

const username = args.reduce(
  (acc, arg) =>
    arg.includes('--username') ? arg.replace('--username=', '') : acc,
  ''
);

stdout.write(`Welcome to the File Manager, ${username} \n`);
infoAboutCurDir();

stdin.on('data', (data) => {
  const stringData = data.toString().trim();

  if (stringData === '.exit') exitFromFileManager();

  if (stringData === 'up') upCommand();

  if (stringData.includes('cd')) cdCommand(stringData);

  if (stringData === 'ls') lsCommand();
});

process.on('SIGINT', exitFromFileManager);
