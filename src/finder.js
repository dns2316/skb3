module.exports.getId = function getId(uPi, id) {
  if (uPi) {
    const userIdPlace = uPi.slice();
    const resUserId = userIdPlace.filter(idInFilter => idInFilter.id === id)
  } else {
    notFound(res)
  }
}
