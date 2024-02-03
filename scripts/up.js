import { cwd, chdir } from 'process';
import infoAboutCurDir from './textCurrentInfo.js';

export default function upCommand() {
  const upDirPath = cwd().slice(0, cwd().lastIndexOf('/'));
  try {
    chdir(upDirPath);
  } catch (err) {}
  infoAboutCurDir();
}
