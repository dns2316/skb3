import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Promise from 'bluebird';

import saveDataInDb from './saveDataInDb';

export default async function main3a(req, res) {
  try {
    mongoose.Promise = Promise;
    mongoose.connect('mongodb://publicdb.mgbeta.ru/dns2316');

    const data = {
      user: {
        name: 'dns2316',
      },
      balls: [
        {
          name: 'Geary',
          type: 'football',
        },
        {
          name: 'Luis',
          type: 'basketball',
        },
        {
          name: 'Poll',
          type: 'volleyball',
        },
      ],
    };

saveDataInDb(data);

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
      res.send('Item was saved!');
  }
  catch (err) {
    console.error('Error when get main3a', err, err.stack)
  }
}
