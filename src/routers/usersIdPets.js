export default async (req, res) => { // список животных конкретного пользователя по его username/id
    const paramsId = req.params.id;
    try {
        if (paramsId) {
            const user = searchById(paramsId, 'users', data);
            const userHavePets = data.pets.slice()
                .filter(pet => pet.userId == user.id);
            res.send(userHavePets);
        } else {
            return notFound(res);
        }
    } catch (err) {
        console.log('/users/:id/pets catch: ', err);
    }
}