export default async (req, res) => { // список животных конкретного пользователя по его username/id
    const paramsId = req.params.id;
    let pet = { ...petsSlice.filter(pet => pet.id == paramsId)[0]};

    try {
        if (pet) {
            const petUser = usersSlice.filter(user => pet.userId == user.id)[0];
            if (petUser) {
                pet.user = petUser;
            }
            return res.json(pet);
        }
        return notFound(res);
    } catch (err) {
        console.log('/pets/:id/populate catch: ', err);
    }
}