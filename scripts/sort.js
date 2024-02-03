export default function sorting(array) {
  const sortedArray = array.sort((a, b) => {
    for (let i = 0; i < a.name.length; i++) {
      if (!b.name[i]) {
        const first = a.name[i - 1].toLowerCase().charCodeAt(0);
        const second = b.name[i - 1].toLowerCase().charCodeAt(0);
        return first - second;
      }
      if (a.name[i] !== b.name[i]) {
        const first = a.name[i].toLowerCase().charCodeAt(0);
        const second = b.name[i].toLowerCase().charCodeAt(0);
        return first - second;
      }
    }
  });
  return sortedArray;
}
