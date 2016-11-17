import fetch from 'node-fetch';

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
let pc = {};
export default () => fetch(pcUrl)
    .then(async (res) => {
      pc = await res.json();
      return pc;
      console.log('pc ', pc);
    })
    .then(function (res) {
      console.log('Was parsed json!');
    })
    .catch (err => {
      console.log('Error: ', err);
    });
