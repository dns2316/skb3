import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import _ from 'lodash';

import notFound from './3a/notFound';
import Ball from './3mongo_practice/balls';
import User from './3mongo_practice/user';
import addToBase from './3mongo_practice/addToBase';
import saveDataInDb from './3mongo_practice/saveDataInDb';

// ======= import 3 practice =======
// import mongoPractice3 from './3mongo_practice/main3video';
mongoose.Promise = Promise;
mongoose.connect('mongodb://publicdb.mgbeta.ru/dns2316');
// ======= end import 3 practice =======

const app = express();
app.use(cors());

app.get('/:userballs', async (req, res) => {
  try {
    const app = express();
    app.use(cors());

    const users = await User.find();
    const balls = await Ball.find().populate('owner'); // Проверяет все элементы в бд по полям owner. Почитать подробнее.
    const caseForSwitch = req.params.userballs;

    console.log(typeof caseForSwitch, caseForSwitch);

    switch (caseForSwitch) {
    case 'users':
      return res.json(users);
      break;
    case 'balls':
      return res.json(balls);
      break;
    case 'add-default':
      return addToBase(),
      res.send('Data was be loaded!'); // сделать через then, что бы небыло ложного сообщения.
      break;
    default:
      return notFound(res);
    }
  } catch (err) {
    console.error('Error when get mongo_practice3', err, err.stack)
  }
});

app.post('/:add', async (req, res) => {
  try{
    const caseForSwitchPost = req.params.add;

    switch (caseForSwitchPost) {
      case 'add':
        const add = req.body;
        console.log(add);
        return res.json(await saveDataInDb(add));
        break;
      default:
        return notFound(res, 'Pls write json')
    }
  } catch (err) {
    res.send('Error in post: ', err);
    console.log('Error in post: ', err);
  }
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
