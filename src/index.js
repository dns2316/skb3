import express from 'express';
import cors from 'cors';

// 4 video
// const bunyan = require('bunyan');
// const log = bunyan.createLogger({name: 'myapp'});
// log.info('hi');
// log.warn({lang: 'en'}, 'Hello my friends!');
// npm install bunyan

// ======= import 3A =======
import notFound from './notFound';
import volumes from './volumes';
import pc from './pc';
// ======= end import 3A =======

const app = express();
app.use(cors());

// ======= 3A =======
app.get('/3a/volumes', volumes);

const toType = obj =>
  ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();

app.get('/3a(/*)?', (req, res) => {
  console.log(req.url);
  console.log(req.url.split('/'));
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
    notFound(res);
  }
  res.json(parts);
});

app.listen(80, () => {
  console.log('App listening on port 80!');
});
