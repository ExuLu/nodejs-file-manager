import { cwd } from 'process';
import { join } from 'path';

export default function (str) {
  return str.includes('/Users') ? str.trim() : join(cwd(), str.trim());
}
