import { readdir } from 'fs/promises';
import { cwd } from 'process';
import infoAboutDir from './knowStats.js';
import infoAboutCurDir from './textInfo.js';

export default async function lsCommand() {
  const subDirs = await readdir(cwd());
  const infoAboutDirs = subDirs.map(async (dir) => {
    const info = await infoAboutDir(dir);
    return info;
  });
  await Promise.all(infoAboutDirs).then((values) => {
    const arrWithDirs = values
      .filter((value) => value.Type === 'directory')
      .sort((a, b) => {
        a.Name - b.Name;
      });
    const arrWithFiles = values
      .filter((value) => value.Type === 'file')
      .sort((a, b) => a.Name - b.Name);

    const resultArray = arrWithDirs.concat(arrWithFiles);
    console.table(resultArray);
  });
  infoAboutCurDir();
}
