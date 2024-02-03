import { rm } from "fs/promises";
import infoAboutCurDir from "./textInfo.js";


export default async function removeCommand(userArg) {
  if (userArg === '') console.error('Invalid input');
  const filePath = userArg.includes('/Users') ? userArg : join(cwd(), userArg);

  try {
    await rm(filePath);
  } catch (err) {
    if (err.code === 'ENOENT') console.error('Operation failed');
  }

  infoAboutCurDir();
}
