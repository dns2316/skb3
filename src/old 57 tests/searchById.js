export default function searchById(id, target, uPi) {
  console.log('start find by id');
  const re = /[\d]+/; // '+' - 1+ numbers, '*' - 0+ numbers!
  if (id) {
    if (target == 'users') {
      console.log('find in users');
      let users = uPi.users.slice();
      if (re.test(id)) { //if id have only 0-9
          users = users.filter(item => item.id == id);}
      else if (!re.test(id)) {
        users = users.filter(item => item.username == id);
      }
        if (users.length > 0) {
          return users[0];
        } else {
          return false;
        }
      }
    else if (target == 'pets') {
      console.log('find in pets');
      let pets = uPi.pets.slice();
      if (re.test(id)) { //if id have only 0-9
          pets = pets.filter(item => item.id == id);
      }
        if (pets.length > 0) {
          return pets[0];
        } else {
          return false;
        }
      }
    }
}