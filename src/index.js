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
function searchByTypePet(uPi, target) { // Найти совпадения id юзера в userId пета, и показать пета с совпадением
  return uPi.pets.slice()
    .filter(pet => pet.type === target);
}

function havePet(uPi, type) {
  let users = uPi.users.slice();
  const a = searchByTypePet(uPi, type)
    .map(pet => pet.userId);
  users = users.filter(user => _.indexOf(a, user.id) !== -1); // ?
  return users;
}

function populateType(uPi, target) {
  const usersList = havePet(uPi, target);
  const petsList = searchByTypePet(uPi, target);
  const petsPopulate = usersList.map( users => ({
    ...users,
    pets: petsList.filter( pet => users.id == pet.userId )
  }));
  console.log(petsPopulate);
  return petsPopulate;
}

function searchByAgePet(uPi, target, level = 'gt' || 'lt') { // Поиск по возрасту пета
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

function populatePets(uPi) {
  const usersList = uPi.users.slice();
  const petsList = uPi.pets.slice();
  let petsPopulate = petsList.map( pet => ({
    ...pet,
    user: usersList.filter( user => user.id == pet.userId )[0] // Зачем тут индекс [0]? Добавляет в пета весь елемент юзера!
  }));
  return petsPopulate;
}

function populateUsers(uPi) {
  const usersList = uPi.users.slice();
  const petsList = uPi.pets.slice();
  let petsPopulate = usersList.map( users => ({
    ...users,
    pets: petsList.filter( pet => users.id == pet.userId ) // Добавляет всех петов!
  }));
  return petsPopulate;
}
// ======= end functions =======

app.get('/', async (req, res) => { // Список всей исходной базы
  const uPi = await usersPets();
  res.json(uPi);
});

// app.get('/:target/:id' { target: 'users', id: '3' }

app.get('/users', async (req, res) => { // Cписок пользователей
  const uPi = await usersPets();
  const havePetParam = req.query.havePet;
  const type = req.query.type; console.log(type);
  let users = uPi.users.slice();

  if (havePet || type) {
    if (havePet) { // Пользователи у которых есть животные type которых указан при запросе в url. /users?havePet=
      res.send(havePet(uPi, havePetParam));
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
    if (paramsId == 'populate') {
      res.send(populateUsers(uPi));
    } else {
    const result = searchById(res, paramsId, 'users', uPi);
    res.json(result);
    }
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
    const type = req.query.type; console.log(type);
    if (paramsId == 'populate') {
      if (type) {
        res.send(populateType(uPi, paramsId));
      } else {
        res.send(populatePets(uPi));
      }
    } else {
      const result = searchById(res, paramsId, 'pets', uPi);
      res.json(result);
    }
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

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
