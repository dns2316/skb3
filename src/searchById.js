import usersPets from './usersPets';

export default function searchById(id, target, uPi) {
  const re = /[\d]+/; // '+' - 1+ numbers, '*' - 0+ numbers!
  // const uPi = await usersPets();
  if (id) {
    if (target == 'users') {
      let users = uPi.users.slice();
      if (re.test(id)) { //if id have only 0-9
          users = users.filter(item => item.id == id);}
      else if (!re.test(id)) {
        users = users.filter(item => item.username == id);
      }
        if (users.length > 0) {
          return users[0];
        }
      }
    }
    else if (target == 'pets') {
      let pets = uPi.pets.slice();
      if (re.test(id)) { //if id have only 0-9
          pets = pets.filter(item => item.id == id);
      }
        if (pets.length > 0) {
          return pets[0];
        }
      }
}
