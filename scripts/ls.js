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
        const firstName = a.Name.toLowerCase().charCodeAt(0);
        const secondName = b.Name.toLowerCase().charCodeAt(0);
        return firstName - secondName;
      });
    const arrWithFiles = values
      .filter((value) => value.Type === 'file')
      .sort((a, b) => {
        const firstName = a.Name.toLowerCase().charCodeAt(0);
        const secondName = b.Name.toLowerCase().charCodeAt(0);
        return firstName - secondName;
      });

    const resultArray = arrWithDirs.concat(arrWithFiles);
    console.table(resultArray);
  });
  infoAboutCurDir();
}
