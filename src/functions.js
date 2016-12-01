import notFound from './notFound';
import searchById from './searchById';

function searchByTypePet(data, target) { // Найти совпадения id юзера в userId пета, и показать пета с совпадением
    return data.pets.slice()
        .filter(pet => pet.type === target);
}

function havePet(data, type) {
    let users = usersSlice;
    const a = searchByTypePet(data, type)
        .map(pet => pet.userId);
    users = users.filter(user => _.indexOf(a, user.id) !== -1); // ?
    return users;
}

function populateType(data, target) {
    const usersList = havePet(data, target);
    const petsList = searchByTypePet(data, target);
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

function populateAge(data, age, level = 'gt' || 'lt') {
    let levelAnswer = null;
    const usersList = usersSlice;

    if (level == 'gt') { // Старше
        levelAnswer = data.pets.slice()
            .filter(pet => pet.age >= age); // больше или равно
        console.log(levelAnswer);
    }
    if (level == 'lt') { // Младше
        levelAnswer = data.pets.slice()
            .filter(pet => pet.age <= age); // меньше или равно
        console.log(levelAnswer);
    }
    const agePopulate = populate(usersList.map(user => user.id == levelAnswer.userId), levelAnswer);
    return agePopulate;
}

function searchByAgePet(data, age, level = 'gt' || 'lt') { // Поиск по возрасту пета
    if (level == 'gt') { // Старше
        console.log(data.pets.slice().filter(pet => pet.age >= age));
        return data.pets.slice()
            .filter(pet => pet.age >= age); // больше или равно
    }
    if (level == 'lt') { // Младше
        console.log(data.pets.slice().filter(pet => pet.age <= age));
        return data.pets.slice()
            .filter(pet => pet.age <= age); // меньше или равно
    }
}

function populatePets(data) {
    const usersList = usersSlice;
    const petsList = data.pets.slice();
    let petsPopulate = petsList.map( pet => ({
        ...pet,
        user: usersList.filter( user => user.id == pet.userId )[0] // Зачем тут индекс [0]? Добавляет в пета весь елемент юзера!
    }));
    return petsPopulate;
}

function populateUsers(data) {
    const usersList = usersSlice;
    const petsList = data.pets.slice();
    const petsPopulate = usersList.map(users => ({
        ...users,
        pets: petsList.filter( pet => users.id == pet.userId ) // Добавляет всех петов!
    }));
    return petsPopulate;
}

export {populateUsers, populatePets, searchByAgePet, populateAge, populate, havePet, searchByTypePet, populateType, notFound, searchById};

console.log('Hi from functions.js');