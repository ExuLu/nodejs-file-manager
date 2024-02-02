import { dirname } from 'path';
import { chdir, cwd, stdin, stdout } from 'process';
import { fileURLToPath } from 'url';

function exitFromFileManager() {
  stdout.write(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit();
}
const args = process.argv.slice(2);

const username = args.reduce(
  (acc, arg) =>
    arg.includes('--username') ? arg.replace('--username=', '') : acc,
  ''
);

stdout.write(`Welcome to the File Manager, ${username} \n`);
stdout.write(`You are currently in ${cwd()} \n`);

stdin.on('data', (data) => {
  const stringData = data.toString().trim();

  if (stringData === '.exit') exitFromFileManager();

  if (stringData === 'up') {
    const upDirPath = cwd().slice(0, cwd().lastIndexOf('/'));
    try {
      chdir(upDirPath);
    } catch (err) {}
    stdout.write(`You are currently in ${cwd()} \n`);
  }
});

process.on('SIGINT', exitFromFileManager);
