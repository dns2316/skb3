import fetch from 'node-fetch';

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
let pc = {};
// export default () => fetch(pcUrl)
//     .then(async (res) => {
//       pc = await res.json();
//       return pc;
//       console.log('pc ', pc);
//     })
//     .catch (err => {
//       console.log('Error: ', err);
//     });

// Vladimir Starkov
// const url = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
//
// let cachedResult;
//
// const addToCache = _ => { cachedResult = _; return _; }
//
// export default () => cachedResult
//   ? Promise.resolve(cachedResult)
//   : fetch(url).then(res => res.json()).then(addToCache);
// end Vladimir Starkov

// Сергей Сова
let cachePc = null;
export default () =>
  cachePc
  ? Promise.resolve(cachePc)
  : fetch(pcUrl)
    .then(res => res.json())
    .then(pc => cachePc = pc)
// end Сергей Сова
