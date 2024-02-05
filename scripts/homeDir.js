import { homedir } from 'os';
import { chdir } from 'process';

export default function goToHomeDir() {
  const homeDir = homedir();
  chdir(homeDir);
}
