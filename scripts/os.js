import { EOL, arch, cpus, homedir, userInfo } from 'os';
import addError from './error.js';
import { noArguments, wrongArgs } from './errMessages.js';
import infoAboutCurDir from './textInfo.js';

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
  else if (command === 'cpus') {
    const cPUS = cpus();
    const cpuNum = cPUS.length;
    console.log(`Total number of cpus: ${cpuNum}`);
    cPUS.forEach((cpu, i) => {
      const name = `CPU-${i}`;
      const { model } = cpu;
      const speed = cpu.speed / 1000;

      console.log(`${name}: model: ${model}, clock rate: ${speed}GHz`);
    });
  } else if (command === 'homedir') {
    console.log(`Your home directory: ${homedir()}`);
  } else if (command === 'username') {
    console.log(`Your system username: ${userInfo().username}`);
  } else if (command === 'architecture') {
    console.log(`Node.js binary has compiled for ${arch()} CPU architecture`);
  } else {
    addError('input', wrongArgs);
    return;
  }

  infoAboutCurDir();
}
