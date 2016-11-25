export default async function finder(res, place, word, name, target) {
  console.log('start finder');
  try {
    let result = {}
    console.log(word, name);
    // console.log(place); //worked.
    if (place) {
      place.forEach(({ target.username }) => {
        if (typeof result[name] === 'undefined') result[name] = {};
        console.log(word, target);
        if (word === target.username) {
          result[name] = {id, usertarget, fulltarget, password, values};
        }
      })
    res.json(result);
    } else {
      notFound(res);
    }
  }
  catch (e) {
    console.error('Error when get names', e, e.stack)
  }
}

// finder(uPi.users, id, users)
