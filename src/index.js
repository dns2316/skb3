import express from 'express';
import cors from 'cors';

// ======== import 3b ========
import usersPets from './usersPets';
import notFound from './notFound';
import finder from './finder'
// ======= end import 3b =======

const app = express();
app.use(cors());

let index = [];

// ======= 3b =======
app.get('/', async (req, res) => {
  const uPi = await usersPets();
  res.json(uPi)
});

app.get('/users', async (req, res) => {
  const uPi = await usersPets();
  return res.json(uPi.users);
});

app.get('/users/:id', async (req, res) => {
  const uPi = await usersPets();
  const idParams = req.params.id - 1;
  if (idParams > 0) {
    console.log(uPi.users[idParams]);
    return res.json(uPi.users[idParams])
  } else {
    notFound(res);
  }
});

app.get('/users/:username', async (req, res) => {
  const idParams = req.params.username;
  const uPi = await usersPets();
  res.json(finder(uPi.users, username, users));
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
