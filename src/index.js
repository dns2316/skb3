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
  return petsPopulate;
}

function populate(usersVar, petsVar) {
  return usersVar.map( users => ({
    ...users,
    pets: petsVar.filter(pet => users.id == pet.userId )
  }));
}

function populateAge(uPi, age, level = 'gt' || 'lt') {
  let levelAnswer = null;
  const usersList = uPi.users.slice();

  if (level == 'gt') { // Старше
    levelAnswer = uPi.pets.slice()
      .filter(pet => pet.age >= age); // больше или равно
      console.log(levelAnswer);
  }
  if (level == 'lt') { // Младше
    levelAnswer = uPi.pets.slice()
      .filter(pet => pet.age <= age); // меньше или равно
      console.log(levelAnswer);
  }
  const agePopulate = populate(usersList.map(user => user.id == levelAnswer.userId), levelAnswer);
  return agePopulate;
}

function searchByAgePet(uPi, age, level = 'gt' || 'lt') { // Поиск по возрасту пета
  if (level == 'gt') { // Старше
    console.log(uPi.pets.slice().filter(pet => pet.age >= age));
    return uPi.pets.slice()
      .filter(pet => pet.age >= age); // больше или равно
  }
  if (level == 'lt') { // Младше
    console.log(uPi.pets.slice().filter(pet => pet.age <= age));
    return uPi.pets.slice()
      .filter(pet => pet.age <= age); // меньше или равно
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
  const petsPopulate = usersList.map(users => ({
    ...users,
    pets: petsList.filter( pet => users.id == pet.userId ) // Добавляет всех петов!
  }));
  return petsPopulate;
}
// ======= end functions =======

app.get('/', async (req, res) => { // Список всей исходной базы
  const uPi = await usersPets();
  return res.json(uPi);
});

// app.get('/:target/:id' { target: 'users', id: '3' }

app.get('/users', async (req, res) => { // Cписок пользователей
  const uPi = await usersPets();
  const query = req.query;
  let usersList = uPi.users.slice();

  try {
    if (query) {
      if (query.havePet) { return res.json(havePet(uPi, query.havePet)); }
    }
    return res.json(usersList);
  } catch (err) {
    console.log('err in /user: ', err);
  }
});

app.get('/users/:id', async (req, res) => { // params id or username. Данные конкретного пользователя по его ID
  const uPi = await usersPets();
  const query = req.query;
  let usersList = uPi.users.slice();
  let petsList = uPi.pets.slice();

  try{
    const paramsId = req.params.id;
    if (paramsId === 'populate') {
        if (query.havePet) {
          const usersWithPetsIDs = petsList
            .filter(pet => pet.type === query.havePet)
            .map(pet => pet.userId);

          usersList = usersList.filter(user => _.indexOf(usersWithPetsIDs, user.id) !== -1);

          usersList = usersList.map(user => ({
            ...user,
            pets: petsList.filter(pet => pet.userId === user.id)
          }));
        }
      if (!query.havePet) {
        usersList = usersList.map(user => ({
          ...user,
          pets: petsList.filter(pet => pet.userId === user.id)
        }));
      }
      return res.json(usersList);
    } else {
    const result = searchById(paramsId, 'users', uPi);
    console.log(result);
    if (result){
      return res.json(result);
    }
  }
  return notFound(res);
  } catch (err) {
    console.log('/users catch: ', err);
  }
});

app.get('/pets', async (req, res) => { // Список животных
  const uPi = await usersPets();
  const query = req.query;
  let petsList = uPi.pets.slice();

  if (query) { // Знаю, что не нужно в коде копипастить.
    console.log('in just query ... without populate. /pets');
    if (query.type) { petsList = petsList.filter(pet => pet.type == query.type); } // берет лист петов из petsList
    if (query.age_gt) { petsList = petsList.filter(pet => pet.age > query.age_gt); } // берет лист петов из верхней строки (если в url несколько запросов)
    if (query.age_lt) { petsList = petsList.filter(pet => pet.age < query.age_lt); } // берет лист петов из верхней строки, что бы показать возраст > x >
    return res.json(petsList);
  } else if (!query) {
    return res.json(uPi.pets);
  }
  return notFound(res);
});

app.get('/pets/:id', async (req, res) => { // params id or username. Поиск животного по его ID
  const uPi = await usersPets();
  let answer = null;
  let petsList = uPi.pets.slice();
  let usersList = uPi.users.slice();
  const paramsId = req.params.id;
  const query = req.query;
  console.log(paramsId);
  try {
    // const ageGt = req.query.age_gt; // Возраст животных, старше age_gt месяцев
    // const ageLt = req.query.age_lt; // Возраст животных, младше age_lt месяцев
    if (paramsId == 'populate') {
        if (query.type) { petsList = petsList.filter(pet => pet.type == query.type); } // берет лист петов из petsList
        if (query.age_gt) { petsList = petsList.filter(pet => pet.age > query.age_gt); } // берет лист петов из верхней строки (если в url несколько запросов)
        if (query.age_lt) { petsList = petsList.filter(pet => pet.age < query.age_lt); } // берет лист петов из верхней строки, что бы показать возраст > x >
          console.log('in pets/populate');
              petsList = petsList.map(pet => ({ // в подготовленый лист петов добавляет их юзеров.
                ...pet,
                user: usersList.filter(user => pet.userId === user.id )[0]
              }));
              return res.json(petsList);
        }
      if (/[\d]+/.test(paramsId)) { // даже если отправить /pets/0 - /[1-9]*/.test скажет true. o_O
      answer = searchById(paramsId, 'pets', uPi); // просто поиск по id пета
        if (answer) {
          return res.json(answer);
        }
      }
    return notFound(res);
  } catch (err) {
    console.log('/pets catch: ', err);
    return notFound(res);
  }
});

app.get('/users/:id/pets', async (req, res) => { // список животных конкретного пользователя по его username/id
  const uPi = await usersPets();
  const paramsId = req.params.id;
  try {
    if (paramsId) {
      const user = searchById(paramsId, 'users', uPi);
      const userHavePets = uPi.pets.slice()
        .filter(pet => pet.userId == user.id);
      res.send(userHavePets);
    } else {
      return notFound(res);
    }
  } catch (err) {
    console.log('/users/:id/pets catch: ', err);
  }
});

app.get('/users/:id/populate', async (req, res) => { // список животных конкретного пользователя по его username/id
  const uPi = await usersPets();
  const paramsId = req.params.id;
  const petsList = uPi.pets.slice();

  try {
    if (paramsId) {
      const user = populateUsers(uPi).filter(user => user.id == paramsId);
      console.log(user);
      return res.json(user);
    }
      return notFound(res);
  } catch (err) {
    console.log('/users/:id/populate catch: ', err);
  }
});

app.get('/pets/:id/populate', async (req, res) => { // список животных конкретного пользователя по его username/id
  const uPi = await usersPets();
  const paramsId = req.params.id;
  const usersList = uPi.users.slice();
  const petsList = uPi.pets.slice();
  let pet = { ...petsList.filter(pet => pet.id == paramsId)[0]};

  try {
    if (pet) {
      const petUser = usersList.filter(user => pet.userId == user.id)[0];
      if (petUser) {
        pet.user = petUser;
      }
      return res.json(pet);
    }
    return notFound(res);
  } catch (err) {
    console.log('/pets/:id/populate catch: ', err);
  }
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
