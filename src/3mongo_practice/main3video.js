import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Promise from 'bluebird';

import notFound from '../3a/notFound';
import saveDataInDb from './saveDataInDb';
import Ball from './balls';
import User from './user';


export default async function mongo_practice3(req, res) {
  try {
    mongoose.Promise = Promise;
    mongoose.connect('mongodb://publicdb.mgbeta.ru/dns2316');

    const app = express();
    app.use(cors());

    const users = await User.find();
    const balls = await Ball.find();
    const caseForSwitch = req.params.userballs;

    console.log(typeof caseForSwitch, caseForSwitch);

    switch (caseForSwitch) {
    case 'users':
      return res.json(users);
      break;
    case 'balls':
      return res.json(balls);
      break;
    default:
      return notFound(res);
  }

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
    console.error('Error when get mongo_practice3', err, err.stack)
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
