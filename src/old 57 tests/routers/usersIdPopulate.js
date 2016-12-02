export default async (req, res) => { // список животных конкретного пользователя по его username/id
    const paramsId = req.params.id;

    try {
        console.log(/.+/.test(paramsId) && paramsId < usersSlice.length());
        if (paramsId) {
            const user = populateUsers(data).filter(user => user.id == paramsId);
            if (user) {
                console.log(user);
                return res.json(user[0]); // без [0] он весь массив берет в [ ]!
            }
        }
        return notFound(res);
    } catch (err) {
        console.log('/users/:id/populate catch: ', err);
    }
}