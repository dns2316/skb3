import express from 'express';
import cors from 'cors';

// ======== import 3b ========
import usersPets from './usersPets';
import notFound from './notFound';
// import finder from './finder'
// ======= end import 3b =======

const app = express();
app.use(cors());

const toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
let index = [];

// ======= 3b =======
app.get('/', async (req, res) => {
  const uPi = await usersPets();
  res.json(uPi)
});

app.get('/users', async (req, res) => {
  const uPi = await usersPets();
  const test = uPi.map(function(obj){
    const rObj = {};
    rObj[obj.users.id] = obj.users.username;
    return rObj;
    console.log(test);
  });
  return res.json(uPi.users);
});

// app.get('/users/:idOrUsername', async (req, res) => {
//   const uPi = await usersPets();
//   const idParams = req.params.idOrUsername;
//   console.log(idParams);
//   console.log(/\d/.test(idParams));
//   if (/\d/.test(idParams) === true) {
//     finder(res, uPi.users, idParams, 'users', 'id');
//   }
//   else if (/[a-z]/.test(idParams) === true) {
//     finder(res, uPi.users, idParams, 'users', 'username');
//   }
// });

// app.get('/users/:username', async (req, res) => {
//   const idParams = req.params.username;
//   console.log(idParams);
//   const uPi = await usersPets();
//   finder(uPi.users, username, users);
// });

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
