import { dirname, join } from 'path';
import { chdir, cwd, stdin, stdout } from 'process';
import { fileURLToPath } from 'url';

function exitFromFileManager() {
  stdout.write(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit();
}
function infoAboutCurDir() {
  stdout.write(`You are currently in ${cwd()} \n`);
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

  if (stringData === 'up') {
    const upDirPath = cwd().slice(0, cwd().lastIndexOf('/'));
    try {
      chdir(upDirPath);
    } catch (err) {}
    infoAboutCurDir();
  }

  if (stringData.includes('cd')) {
    const userArg = stringData.slice(3);
    if (userArg.trim() === '') console.error('Invalid input');
    const newDirPath = join(cwd(), stringData.slice(3));
    try {
      chdir(newDirPath);
    } catch (err) {
      if (err.code === 'ENOENT') console.error('Operation failed');
    }

    infoAboutCurDir();
  }
});

process.on('SIGINT', exitFromFileManager);
