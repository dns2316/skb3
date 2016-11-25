export default async function finder(place, word, name) {
  try {
    const result = {}
    console.log(word, name);
    if (place) {
      console.log(place);
      place.forEach(({ word }) => {
        if (typeof result[name] === 'undefined') result[name] = 0
        result[name] += id, username, fullname, password, values;
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
