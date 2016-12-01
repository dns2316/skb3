import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import fetch from 'node-fetch';


// ======= connected json =======

// ======= end connected json =======

// ======= variables =======
// let usersSlice = data.users.slice();
// let petsSlice = data.pets.slice();
// ======= end variables =======

// ======== import 3b ========
// import notFound from './notFound';
// import searchById from './searchById';
// ======= end import 3b =======

const app = express();
app.use(cors());

// ======= routers =======
import rRoot from './routers/root';
import rUsers from './routers/users';
import rUsersId from './routers/usersId';
import rPets from './routers/pets';
import rPetsId from './routers/petsId';
import rUsersIdPets from './routers/usersIdPets';
import rUsersIdPopulate from './routers/usersIdPopulate';
import rPetsIdPopulate from './routers/petsIdPopulate';
// ======= end routers =======

app.get('/', rRoot);

app.get('/users', rUsers);

app.get('/users/:id', rUsersId);

app.get('/pets', rPets);

app.get('/pets/:id', rPetsId);

app.get('/users/:id/pets', rUsersIdPets);

app.get('/users/:id/populate', rUsersIdPopulate);

app.get('/pets/:id/populate', rPetsIdPopulate);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
