import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import _ from 'lodash';
import bodyParser from 'body-parser'; // Почитать про эту либу.

import notFound from './3a/notFound';
import Ball from './3mongo_practice/balls';
import User from './3mongo_practice/user';
import addToBase from './3mongo_practice/addToBase';
import saveDataInDb from './3mongo_practice/saveDataInDb';
import sandbox from './3mongo_practice/sandbox';
import isAdmin from './3mongo_practice/middlewares/isAdmin';

// ======= import 3 practice =======
// import mongoPractice3 from './3mongo_practice/main3video';
mongoose.Promise = Promise;
mongoose.connect('mongodb://publicdb.mgbeta.ru/dns2316');
// ======= end import 3 practice =======

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(isAdmin);

app.get('/:userballs', isAdmin, async (req, res) => {
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

app.get('/clear', isAdmin, async (req, res) => { // Либо для всего прописывать роутеры, либо ставить мидлвару isAdmin на роутер с кейсами.
      await User.remove({}); // Либо узнать как на отдельный кейс ставить мидлвару.
      await Ball.remove({}); // Этот роутер не работает, пишет Not Found - срабатывает функция notFound. Оставил isAdmin на роутере с кейсами.
      res.send('DB was removed!');
});

app.post('/:add', isAdmin, async (req, res) => {
  try{
    const caseForSwitchPost = req.params.add;

    switch (caseForSwitchPost) {
      case 'add':
        const add = req.body;
        if (!add.user) return notFound(res, 'Write correct "user".', 400);
        if (!add.balls) add.balls = [];

        const user = await User.findOne({
          name: add.user.name
        });
        if (user) return notFound(res, 'username is exist.', 400);
        try {
          return res.json(await saveDataInDb(add));
        } catch (err) {
          return res.status(500).json(err);
        }
        break;
      default:
        return notFound(res, 'Pls write json, and correct url', 404);
    };
  } catch (err) {
    notFound(res, err, 500);
    console.log('Error in post: ', err);
  }
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
