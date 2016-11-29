import express from 'express';
import cors from 'cors';
import _ from 'lodash';

// ======== import 3b ========
import usersPets from './usersPets';
import notFound from './notFound';
// import finder from './finder'
import searchById from './searchById';
// ======= end import 3b =======

const app = express();
app.use(cors());

// ======= functions =======

// ======= end functions =======
app.get('/', async (req, res) => {
  const uPi = await usersPets();
  res.json(uPi)
});

// app.get('/:target/:id' { target: 'users', id: '3' }

app.get('/users', async (req, res) => {
  const uPi = await usersPets();
  const havePet = req.query.havePet;
  let users = uPi.users.slice();

  if (havePet) {
    let searchByType = uPi.pets.slice()
      .filter(pet => pet.type == havePet)
      .map(pet => pet.userId);
      console.log(searchByType);
    users = users.filter(user => _.indexOf(searchByType, user.id) !== -1);
  }
  res.json(users)
});

app.get('/users/:id', async (req, res) => { // params id or username
  const uPi = await usersPets();
  try{
    const paramsId = req.params.id;
    searchById(res, paramsId, 'users');
  } catch (err){
    console.log('/users catch: ', err);
    notFound(res);
  }
});

app.get('/pets', async (req, res) => {
  const uPi = await usersPets();
  res.json(uPi.pets)
});

app.get('/pets/:id', async (req, res) => { // params id or username
  const uPi = await usersPets();
  try{
    const paramsId = req.params.id;
    searchById(res, paramsId, 'pets');
  } catch (err){
    console.log('/pets catch: ', err);
    notFound(res);
  }
});

app.get('/users/:id/pets', (res, req) => {
  const p = req.params;
  console.log(p);
  res.send('ok, id - ');
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
