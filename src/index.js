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
app.get('/3a', async (req, res) => {
  const pcOut = await pc();
  res.json(pcOut);
});

app.get('/3a/volumes', volumes);


app.get('/3a*', (req, res) => {
  const field = pc.getSomeField(req.originalUrl);
  if (field === undefined) {
    notFound(res);
  } else {
    res.status(200);
    if (typeof field === 'object') {
      console.log('typeof field: ', typeof field);
      res.send(field);
    } else {
      console.log('else typeof field: ', typeof field);
      res.send(JSON.stringify(field));
    }
  }
});

// app.get('/3a/:var1/:var2', (req, res) => { // Вместо кучи параметров, можно поставить зведочку * !
//   const reqParams = req.params;
//   if (pc[reqParams.var1] !== undefined && pc[reqParams.var1][reqParams.var2] !== undefined) {
//     res.json(pc[reqParams.var1][reqParams.var2]);
//     console.log('pc[hdd][length]: ' + pc[reqParams.hdd][reqParams.length]);
//     console.log('reqParams: ' + reqParams);
//   } else {
//     // res.send('Enter correct request!');
//     notFound(res);
//   }
// });
//
// app.get('/3a/:var1/:var2/:var3', (req, res) => {
//   const reqParams = req.params;
//   if (pc[reqParams.var1] !== undefined && pc[reqParams.var1][reqParams.var2] !== undefined && pc[reqParams.var1][reqParams.var2][reqParams.var3]) {
//     res.json(pc[reqParams.var1][reqParams.var2][reqParams.var3]);
//   } else {
//     // res.send('Enter correct request!');
//     notFound(res);
//   }
// });

// ======= end 3A =======

app.listen(80, () => {
  console.log('App listening on port 80!');
});
