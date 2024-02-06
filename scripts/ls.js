import { readdir } from 'fs/promises';
import { cwd } from 'process';
import infoAboutDir from './knowStats.js';
import infoAboutCurDir from './textInfo.js';
import sorting from './sort.js';

export default async function lsCommand() {
  const subDirs = await readdir(cwd());
  const infoAboutDirs = subDirs.map(async (dir) => {
    const info = await infoAboutDir(dir);
    return info;
  });
  await Promise.all(infoAboutDirs).then((values) => {
    const arrWithDirs = values.filter((value) => value.Type === 'directory');
    const sortedDirs = sorting(arrWithDirs);
    const arrWithFiles = values.filter((value) => value.Type === 'file');
    const sortedFiles = sorting(arrWithFiles);

    const resultArray = sortedDirs.concat(sortedFiles);
    console.table(resultArray);
  });
  infoAboutCurDir();
}
