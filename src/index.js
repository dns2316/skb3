import express from 'express';
import cors from 'cors';

// 4 video
// const bunyan = require('bunyan');
// const log = bunyan.createLogger({name: 'myapp'});
// log.info('hi');
// log.warn({lang: 'en'}, 'Hello my friends!');
// npm install bunyan

// ======= import 3A =======
import volumes from './volumes';
import main3a from './main3a';
// ======= end import 3A =======

const app = express();
app.use(cors());

// ======= 3A =======
app.get('/3a/volumes', volumes);
app.get('/3a(/*)?', main3a);

app.listen(80, () => {
  console.log('App listening on port 80!');
});
