import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
import canonize from './canonize';
import volumes from './volumes';

// ======= 3A NekrasovEV =======
const AsyncRouter = require("express-async-router").AsyncRouter;
const router = AsyncRouter();
const _ = require('lodash');

module.exports = function(param) {
  router.get("/", async function(req.computer);
)};

let pathes = [];

function createPath(obj, originPath = '') {
  _.forIn(obj, function (value, key) {
    path = originPath;
    path += `/${key}`;
    if (_.isObject(value)) {
      createPath(value, path);
    } else {
      pathes.push(path);
    }
  });
  if(originPath)
  pathes.push(originPath);
}
createPath(param);

pathes.forEach((item) => {
  router.get(item, async function (req, res) {
    let data = item.split('/').filter((el) => el);
    let elem = data.reduce(function(item, curent) {
      return item[current];
    }, req.computer);

    return await res.json(elem);
  });
});
// ======= end 3A NekrasovEV =======

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
  console.log('params: ' + req.params);
  console.log(req.params[0]);
  console.log(canonize(req.query));
  // if (req.baseUrl != '' || req.baseUrl != null) {
  //     res.send(pc[req.baseUrl]);
  // }
  // else {
    // res.send(pc);
  // }
  // ======= 3A NekrasovEV =======
  let ret = {};
  let data = {};
  req.computer.hdd.forEach((item => {
    ret[item.volume] = ret[item.volume] || 0;
    ret[item.volume] += item.size;
  });

_.forIn(ret, function (value, key) {
  data[key] =value.toString() + "B";
});

return await res.json(data);
});
  // ======= end 3A NekrasovEV =======
// });

app.listen(80, () => {
  console.log('App listening on port 80!');
});
