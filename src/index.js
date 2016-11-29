import express from 'express';
import cors from 'cors';
import _ from 'lodash';

// ======== import 3b ========
import usersPets from './usersPets';
import notFound from './notFound';
import searchById from './searchById';
// ======= end import 3b =======

const app = express();
app.use(cors());

// ======= functions =======
// const uPi = async function uPi() {
//   return await usersPets();
// };
// console.log(usersPets);
function searchByTypePet(uPi, target) {
  console.log(uPi.pets.slice().filter(pet => pet.type == target));
  return uPi.pets.slice()
    .filter(pet => pet.type === target);
}

function searchByAgePet(uPi, target, level = 'gt' || 'lt') {
  if (level == 'gt') { // Старше
    console.log(uPi.pets.slice().filter(pet => pet.age >= target));
    return uPi.pets.slice()
      .filter(pet => pet.age >= target); // больше или равно
  }
  if (level == 'lt') { // Младше
    console.log(uPi.pets.slice().filter(pet => pet.age <= target));
    return uPi.pets.slice()
      .filter(pet => pet.age <= target); // меньше или равно
  }
}
// ======= end functions =======

app.get('/', async (req, res) => { // Список всей исходной базы
  const uPi = await usersPets();
  res.json(uPi);
});

// app.get('/:target/:id' { target: 'users', id: '3' }

app.get('/users', async (req, res) => { // Cписок пользователей
  const uPi = await usersPets();
  const havePet = req.query.havePet;
  const type = req.query.type; console.log(type);
  let users = uPi.users.slice();

  if (havePet || type) {
    if (havePet) { // Пользователи у которых есть животные type которых указан при запросе в url. /users?havePet=
      searchByTypePet(uPi, havePet)
        .map(pet => pet.userId);
      users = users.filter(user => _.indexOf(searchByType, user.id) !== -1); // ?
    }
    if (type) {
      const resultByPetType = searchByTypePet(uPi, type);
      res.json(resultByPetType);
    } else {
      notFound(res);
    }
  } else {
    res.json(users);
  }
});

app.get('/users/:id', async (req, res) => { // params id or username. Данные конкретного пользователя по его ID
  const uPi = await usersPets();
  try{
    const paramsId = req.params.id;
    const result = searchById(res, paramsId, 'users', uPi);
    res.json(result);
  } catch (err) {
    console.log('/users catch: ', err);
    notFound(res);
  }
});

app.get('/pets', async (req, res) => { // Список животных
  const uPi = await usersPets();
  const ageGt = req.query.age_gt; // Возраст животных, старше age_gt месяцев
  const ageLt = req.query.age_lt; // Возраст животных, младше age_lt месяцев

  if (req.query) {
    if (ageGt) {
      const result = searchByAgePet(uPi, ageGt, 'gt');
      res.json(result);
    }
    if (ageLt) {
      const result = searchByAgePet(uPi, ageLt, 'lt');
      res.json(result);
    }
  } else if (!req.query) {
    res.json(uPi.pets)
  }
});

app.get('/pets/:id', async (req, res) => { // params id or username. Поиск животного по его ID
  const uPi = await usersPets();
  try{
    const paramsId = req.params.id;
    const result = searchById(res, paramsId, 'pets', uPi);
    res.json(result);
  } catch (err) {
    console.log('/pets catch: ', err);
    notFound(res);
  }
});

app.get('/users/:id/pets', async (req, res) => { // список животных конкретного пользователя по его username/id
  const uPi = await usersPets();
  const paramsId = req.params.id;
  try {
    if (paramsId) {
      const user = searchById(res, paramsId, 'users', uPi);
      const userHavePets = uPi.pets.slice()
        .filter(pet => pet.userId == user.id);
      res.send(userHavePets);
    } else {
      notFound(res);
    }
  } catch (err) {
    console.log('/users/:id/pets catch: ', err);
  }
});

// populate

app.get('/pets/populate', async (req, res) => {
  const uPi = await usersPets(); console.log(uPi);
  const usersList = uPi.users.slice(); console.log(usersList);
  const result = usersList.map(users => users.filter(pet => pet.userId === users.id));
  console.log(result);
  res.send(result);
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
