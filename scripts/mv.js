import { join } from 'path';
import infoAboutCurDir from './textInfo.js';
import { cwd } from 'process';
import { access, readdir, rm, stat } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';

export default async function moveCommand(userArg) {
  const userArgArray = userArg.split(' ');

  if (userArg === '' || !userArg.includes(' ')) {
    console.error('Invalid input');
    infoAboutCurDir();
    return;
  }

  const oldFilePath = userArgArray[0].includes('/Users')
    ? userArgArray[0]
    : join(cwd(), userArgArray[0]);

  const newDirPath = userArgArray[1].includes('/Users')
    ? userArgArray[1]
    : join(cwd(), userArgArray[1]);

  const fileName = oldFilePath.slice(oldFilePath.lastIndexOf('/') + 1);
  console.log(fileName);

  try {
    await access(oldFilePath);
  } catch (err) {
    console.error('Operation failed');
    infoAboutCurDir();
    return;
  }

  try {
    await access(newDirPath);
    const info = await stat(newDirPath);
    if (!info.isDirectory()) {
      console.error('Invalid input');
      infoAboutCurDir();
      return;
    }
    const newDirFiles = await readdir(newDirPath);
    if (newDirFiles.includes(fileName)) {
      console.error('Operation failed');
      infoAboutCurDir();
      return;
    }
  } catch (err) {
    console.error('Operation failed');
    infoAboutCurDir();
    return;
  }

  const originalFileStream = createReadStream(oldFilePath);
  const copyFileStream = createWriteStream(join(newDirPath, fileName));
  originalFileStream.pipe(copyFileStream);

  await rm(oldFilePath);

  infoAboutCurDir();
}
