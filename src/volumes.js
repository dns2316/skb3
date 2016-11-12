export default function sumhdd(jsonFile, key) {
  // const sumHdd = JSON.stringify(jsonFile, ['hdd', 'volume', 'size']);
  const sumHdd = JSON.parse(jsonFile, ['hdd', 'volume', 'size']);
  console.log(sumHdd);
  // const reVolume = new RegExp('^([A-Z]{1})?([0-9]*)?$', 'g');
  // const volume = sumHdd.match(reVolume);
  // console.log(volume);
  return sumHdd;
};
