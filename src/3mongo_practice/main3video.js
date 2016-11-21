import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import _ from 'lodash';

import notFound from '../3a/notFound';
import Ball from './balls';
import User from './user';
import addToBase from './addToBase';
import connectToMong from './main3video';

export default async function mongo_practice3(req, res) {
  try {
    mongoose.Promise = Promise;
    connectToMong;

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
      break;
    default:
      return notFound(res);
    }
  } catch (err) {
    console.error('Error when get mongo_practice3', err, err.stack)
  }
}
