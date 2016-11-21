import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import _ from 'lodash';

import notFound from './3a/notFound';
import Ball from './3mongo_practice/balls';
import User from './3mongo_practice/user';
import addToBase from './3mongo_practice/addToBase';

// ======= import 3 practice =======
// import mongoPractice3 from './3mongo_practice/main3video';
// export function connectToMong () { return mongoose.connect('mongodb://publicdb.mgbeta.ru/dns2316')};
mongoose.Promise = Promise;
mongoose.connect('mongodb://publicdb.mgbeta.ru/dns2316');
// ======= end import 3 practice =======

const app = express();
app.use(cors());

app.get('/3practice/:userballs', async (req, res) => {
  try {
    const app = express();
    app.use(cors());

    const users = await User.find();
    const balls = await Ball.find().populate('owner'); // Проверяет все элементы в бд по полям owner.
    const caseForSwitch = req.params.userballs;

    console.log(typeof caseForSwitch, caseForSwitch);

    switch (caseForSwitch) {
    case 'users':
      return res.json(users);
      break;
    case 'balls':
      return res.json(balls);
      break;
    case 'add':
      return addToBase;
      return res.send('data was be loaded');
      break;
    default:
      return notFound(res);
    }
  } catch (err) {
    console.error('Error when get mongo_practice3', err, err.stack)
  }
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
