import infoAboutCurDir from './textInfo.js';

export default function addError(type = 'operation', message = '') {
  let firstMessage = '';
  if (type === 'operation') firstMessage = 'ERROR: Operation failed';
  if (type === 'input') firstMessage = 'ERROR: Invalid input';
  console.error(firstMessage);
  console.error(message);
  infoAboutCurDir();
}
