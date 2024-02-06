export default function sorting(array) {
  const sortedArray = array.sort((a, b) => {
    for (let i = 0; i < a.Name.length; i++) {
      if (!b.Name[i]) {
        const first = a.Name[i - 1].toLowerCase().charCodeAt(0);
        const second = b.Name[i - 1].toLowerCase().charCodeAt(0);
        return first - second;
      }
      if (a.Name[i] !== b.Name[i]) {
        const first = a.Name[i].toLowerCase().charCodeAt(0);
        const second = b.Name[i].toLowerCase().charCodeAt(0);
        return first - second;
      }
    }
  });
  return sortedArray;
}
