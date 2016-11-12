import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
import canonize from './canonize';
import volumes from './volumes';

// ======= 3A =======
const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch(err => {
    console.log('Error: ', err);
  });
  // const sumHdd = JSON.stringify(jsonFile, []);
// ======= end 3A =======

const app = express();
app.use(cors());

app.get('/3a', (req, res) => {
  console.log('req.baseUrl: ' + req.baseUrl);
  if (req.baseUrl != '' || req.baseUrl != null) {
      res.send(pc[req.baseUrl]);
  }
  else {
    res.send(pc);
  }
});

app.listen(80, () => {
  console.log('App listening on port 80!');
});
