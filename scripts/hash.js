import { createHash } from 'crypto';
import { readFile } from 'fs/promises';

export default function hashCommand(userArg) {
  if (userArg === '') {
    addError('input', noArguments);
  }
  const filePath = createPath(userArg);

  try {
    const fileContent = readFile(filePath, 'utf-8');
    const hash = createHash('sha256').update(fileContent).digest('hex');
    console.log(hash);
  } catch (err) {
    console.log(err);
  }
}
