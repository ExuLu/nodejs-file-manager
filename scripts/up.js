import { cwd, chdir } from 'process';
import infoAboutCurDir from './textInfo.js';

export default function upCommand() {
  const upDirPath = cwd().slice(0, cwd().lastIndexOf('/'));
  try {
    chdir(upDirPath);
  } catch (err) {}
  infoAboutCurDir();
}
