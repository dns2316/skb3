import express from 'express';
import cors from 'cors';

// ======== import 3b ========
import usersPets from './usersPets';
import notFound from './notFound';
// import finder from './finder'
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
  res.json(uPi.users)
});

app.get('/users/:id', async (req, res) => { // params id or username
  const uPi = await usersPets();
  try{
    const p = req.params;
    const re = /[\d]+/; // '+' - 1+ numbers, '*' - 0+ numbers!

    if (p.id) {
      let users = uPi.users.slice();
      if (re.test(p.id)) { //if id have only 0-9
          users = users.filter(item => item.id == p.id);}
      else if (re.test(p.id)) {
        users = users.filter(item => item.username == p.id);
      }
        if (users.length > 0) {
          return res.json(users[0]);
        }
      }
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
    const p = req.params;
    const re = /[\d]+/; // '+' - 1+ numbers, '*' - 0+ numbers!

    if (p.id) {
      let pets = uPi.pets.slice();
      if (re.test(p.id)) { //if id have only 0-9
          pets = pets.filter(item => item.id == p.id);
        if (pets.length > 0) {
          return res.json(pets[0]);
        }
      }
    }
  } catch (err){
    console.log('/users catch: ', err);
    notFound(res);
  }
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
