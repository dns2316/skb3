export default async function finder(res, place, word, name, target) {
  console.log('start finder');
  try {
    function isSearch(mark, target) {
      if (target === mark) {
        return
      }
    }

    let result = {}
    console.log(word, name);
    if (place) {
      place.map(function(fromMap) {
        place.filter(isSearch(word, fromMap));
        return fromMap
      })
    res.json(fromMap);
    } else {
      notFound(res);
    }
  }
  catch (e) {
    console.error('Error when get names', e, e.stack)
  }
}

// finder(uPi.users, id, users)
