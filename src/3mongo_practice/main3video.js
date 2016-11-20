import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Promise from 'bluebird';

import notFound from '../3a/notFound';
import saveDataInDb from './saveDataInDb';
import Ball from './balls';
import User from './user';


export default async function main3a(req, res) {
  try {
    mongoose.Promise = Promise;
    mongoose.connect('mongodb://publicdb.mgbeta.ru/dns2316');

    const app = express();
    app.use(cors());

    const users = await User.find();
    const balls = await Ball.find();

    console.log(req.url);
    const parts = req.url.split('/') // Делит строку на массив делителем '/'
      .filter(el => el).slice(1,2); // Берет элементы с индексом 1+ (0 индекс = 3а)
    console.log(parts);
    parts.map(function (part) {
      switch (part) {
      case users:
        return res.json(users);
        break;
      case balls:
        return res.json(balls);
        break;
      default:
        return notFound(res);
    }
  })

    //
    // const users = await.User.find();
    // return res.json(users);
    //
    // const balls = await.Ball.find();
    // return res.json(balls);
    //
    // const data = {
//       user: {
//         name: 'dns2316',
//       },
//       balls: [
//         {
//           name: 'Geary',
//           type: 'football',
//         },
//         {
//           name: 'Luis',
//           type: 'basketball',
//         },
//         {
//           name: 'Poll',
//           type: 'volleyball',
//         },
//       ],
//     };
//
// saveDataInDb(data);

      // res.send('Item was saved!');
  }
  catch (err) {
    console.error('Error when get main3a', err, err.stack)
  }
}

//     const Ball = mongoose.model('Ball', {
//       type: String,
//       name: String,
//     });
//
//     const football = new Ball({
//       name: 'geary',
//       type: 'football',
//     });
//
//     football.save()
//       .then(() => {
//         console.log('item was saved');
//       })
//       .catch((err) => {
//         console.log('err: ', err);
//       });
