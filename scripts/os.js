import { EOL, cpus, homedir } from 'os';
import addError from './error.js';
import { noArguments, wrongArgs } from './errMessages.js';

export default function osInfo(userArg) {
  if (userArg.trim() === '') {
    addError('input', noArguments);
    return;
  }
  if (!userArg.includes('--')) {
    addError('input', wrongArgs);
    return;
  }

  const command = userArg.slice(2);
  if (command === 'EOL')
    console.log(`You default system End-Of-Line is: ${EOL}`);
  if (command === 'cpus') {
    const cPUS = cpus();
    const cpuNum = cPUS.length;
    console.log(`Total number of cpus: ${cpuNum}`);
    cPUS.forEach((cpu, i) => {
      const name = `CPU-${i}`;
      const { model } = cpu;
      const speed = cpu.speed / 1000;

      console.log(`${name}: model: ${model}, clock rate: ${speed}GHz`);
    });
  }
  if (command === 'homedir') {
    console.log(`Your home directory: ${homedir()}`);
  }
}
