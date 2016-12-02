import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import fetch from 'node-fetch';
// ======= routers{ =======
import rRoot from './routers/root';
import rUsers from './routers/users';
import rUsersId from './routers/usersId';
import rPets from './routers/pets';
import rPetsId from './routers/petsId';
import rUsersIdPets from './routers/usersIdPets';
import rUsersIdPopulate from './routers/usersIdPopulate';
import rPetsIdPopulate from './routers/petsIdPopulate';
// ======= }routers =======

// ======= connected json{ =======
// const dataUrl = 'https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/data.json';
const dataUrl = 'https://raw.githubusercontent.com/dns2316/skb3/3b/data.json';

let data={};

fetch(dataUrl)
  .then(async (res) => {
    data = await res.json();
  })
  .catch(err => {
    console.log('ERROR', err);
  });
// ======= }connected json =======
console.log(data);
// ======= config{ =======
const app = express();
app.use(cors());
// ======= }config =======

app.get('/', rRoot(data));

app.get('/users', rUsers(data));

app.get('/users/:id', rUsersId(data));

app.get('/pets', rPets(data));

app.get('/pets/:id', rPetsId(data));

app.get('/users/:id/pets', rUsersIdPets(data));

app.get('/users/:id/populate', rUsersIdPopulate(data));

app.get('/pets/:id/populate', rPetsIdPopulate(data));

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
