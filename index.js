import { stdin, stdout } from 'process';

const args = process.argv.slice(2);
function exitFromFileManager() {
  stdout.write(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit();
}

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
