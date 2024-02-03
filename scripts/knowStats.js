import { stat } from 'fs/promises';
import { join } from 'path';
import { cwd } from 'process';

export default async function infoAboutDir(dir) {
  const info = await stat(join(cwd(), dir));
  let dirOrFile = 'unknown';
  if (info.isFile()) dirOrFile = 'file';
  if (info.isDirectory()) dirOrFile = 'directory';
  const infoObj = { Name: dir, Type: dirOrFile };
  return infoObj;
}
