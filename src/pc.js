import fetch from 'node-fetch';

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let cachePc = null;

export default () =>
  cachePc
  ? Promise.resolve(cachePc)
  : fetch(pcUrl)
    .then(res => res.json())
    .then(pc => cachePc = pc)
