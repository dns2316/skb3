import fetch from 'node-fetch';
// import fetch from 'isomorphic-fetch';

const uPiUrl = 'https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/pets.json';

let cacheUpI = null;

export default () =>
  cacheUpI
  ? Promise.resolve(cacheUpI)
  : fetch(uPiUrl)
    .then(res => res.json())
    .then(uPi => cacheUpI = uPi)
