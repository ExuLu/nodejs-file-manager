export default function hashCommand(userArg) {
    if (userArg === '') {
        addError('input', noArguments);
      }
      const filePath = createPath(userArg);
}
