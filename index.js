import { join } from 'path';
import { chdir, cwd, stdin, stdout } from 'process';
import { readdir, stat } from 'fs/promises';

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
async function infoAboutDir(dir) {
  const info = await stat(join(cwd(), dir));
  let dirOrFile = 'unknown';
  if (info.isFile()) dirOrFile = 'file';
  if (info.isDirectory()) dirOrFile = 'directory';
  const infoObj = { Name: dir, Type: dirOrFile };
  return infoObj;
}

async function lsCommand() {
  const subDirs = await readdir(cwd());
  const infoAboutDirs = subDirs.map(async (dir) => {
    const info = await infoAboutDir(dir);
    return info;
  });
  Promise.all(infoAboutDirs).then((values) => console.table(values));
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

  if (stringData === '.exit') exitFromFileManager();

  if (stringData === 'up') upCommand();

  if (stringData.includes('cd')) cdCommand(stringData);

  if (stringData === 'ls') await lsCommand();
});

process.on('SIGINT', exitFromFileManager);
