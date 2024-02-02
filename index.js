import { dirname } from 'path';
import { stdin, stdout } from 'process';
import { fileURLToPath } from 'url';

function exitFromFileManager() {
  stdout.write(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit();
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);

const username = args.reduce(
  (acc, arg) =>
    arg.includes('--username') ? arg.replace('--username=', '') : acc,
  ''
);

stdout.write(`Welcome to the File Manager, ${username} \n`);
stdin.on('data', (data) => {
  const stringData = data.toString().trim();
  if (stringData === '.exit') exitFromFileManager();

  console.log(stringData);
});
process.on('SIGINT', exitFromFileManager);
