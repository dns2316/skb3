import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

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
  res.json(pc);
});

// ======= Списал у iCoderXXI'a =======

function notFound(res) {
  res.send('Not Found', 404);
};

app.get('/3a/volumes', (req, res) => {
  if (pc.hdd) {
    const relustVolumes = {};
    pc.hdd.map( (item) => {
      if (relustVolumes[item.volume]) {
        relustVolumes[item.volume] += item.size;
      } else {
        relustVolumes[item.volume] = item.size;
      }
    });

    console.log('|relustVolumes: ' + relustVolumes, '|type: ' + typeof(relustVolumes), '|type "pc": ' + typeof(pc));

    Object.keys(relustVolumes).forEach( (key) => {
      relustVolumes[key] += 'B'; // B - ?
    })

    res.json(relustVolumes);
  } else {
    // res.send('Enter correct request!');
    notFound(res);
  }
});

app.get('/3a/:var1', (req, res) => {
  if (pc[req.params.var1] !== undefined) {
    res.json(pc[req.params.var1]);
  } else {
    // res.send('Enter correct request!');
    notFound(res);
  }
});

app.get('/3a/:var1/:var2', (req, res) => {
  const reqParams = req.params;
  if (pc[reqParams.var1] !== undefined && pc[reqParams.var1][reqParams.var2] !== undefined) {
    res.json(pc[reqParams.var1][reqParams.var2]);
  } else {
    // res.send('Enter correct request!');
    notFound(res);
  }
});

app.get('/3a/:var1/:var2/:var3', (req, res) => {
  const reqParams = req.params;
  if (pc[reqParams.var1] !== undefined && pc[reqParams.var1][reqParams.var2] !== undefined && pc[reqParams.var1][reqParams.var2][reqParams.var3]) {
    res.json(pc[reqParams.var1][reqParams.var2][reqParams.var3]);
  } else {
    // res.send('Enter correct request!');
    notFound(res);
  }
});

// ======= end Списал у iCoderXXI'a =======

app.listen(80, () => {
  console.log('App listening on port 80!');
});
