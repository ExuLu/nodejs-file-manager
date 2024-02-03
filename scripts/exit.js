import { stdout, exit } from 'process';

export default function exitFromFileManager(username) {
  stdout.write(`\nThank you for using File Manager, ${username}, goodbye!`);
  exit();
}
