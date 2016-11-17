import express from 'express';
import fetch from 'isomorphic-fetch';
const app = express();
const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
let pc;
fetch(pcUrl)
  .then(response => response.json())
  .then((pcData) => {
    pc = pcData;
    app.listen(3000, () => {
      console.log('On http://localhost:3000/');
    });
  })
  .catch(e => console.log('Что то пошло не так:', e));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.get('/', (req, res) => {
  res.json({ response: 'Hello, World!' });
});
app.get('/task3a/volumes', (req, res) => {
  const result = {};
  pc.hdd.forEach((el) => {
    result[el.volume] = (result[el.volume] || 0) + el.size;
  });
  Object.keys(result).forEach((el) => {
    result[el] = `${result[el]}B`;
  });
  res.json(result);
});
// https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
const toType = obj =>
  ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
app.get('/task3a(/*)?', (req, res) => {
  const parts = req.url.split('/')
    .filter(el => el).slice(1)
    .reduce((prev, curr) => {
      if (toType(prev) === 'object') {
        if ({}.hasOwnProperty.call(prev, curr)) {
          return prev[curr];
        }
      } else if (toType(prev) === 'array') {
        if (!isNaN(curr)) {
          return prev[curr];
        }
      }
        return undefined;
    }, pc);
  if (parts === undefined) {
    res.status(404).send('Not Found');
  }
  res.json(parts);
});
