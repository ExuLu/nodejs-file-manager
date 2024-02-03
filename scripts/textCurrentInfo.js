import { stdout, cwd } from 'process';

export default function infoAboutCurDir() {
  stdout.write(`You are currently in ${cwd()} \n`);
}
