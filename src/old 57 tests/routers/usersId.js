import {populateUsers, populatePets, searchByAgePet, populateAge, populate, havePet, searchByTypePet, populateType} from "../functions";

export default async (req, res) => { // params id or username. Данные конкретного пользователя по его ID
    const query = req.query;

    try{
        const paramsId = req.params.id;
        if (paramsId === 'populate') {
            if (query.havePet) {
                const usersWithPetsIDs = petsSlice
                    .filter(pet => pet.type === query.havePet)
                    .map(pet => pet.userId);

                usersSlice = usersSlice.filter(user => _.indexOf(usersWithPetsIDs, user.id) !== -1);

                usersSlice = usersSlice.map(user => ({
                    ...user,
                    pets: petsSlice.filter(pet => pet.userId === user.id)
                }));
            }
            if (!query.havePet) {
                usersSlice = usersSlice.map(user => ({
                    ...user,
                    pets: petsSlice.filter(pet => pet.userId === user.id)
                }));
            }
            return res.json(usersSlice);
        } else {
            const result = searchById(paramsId, 'users', data);
            console.log(result);
            if (result){
                return res.json(result);
            }
        }
        return notFound(res);
    } catch (err) {
        console.log('/users catch: ', err);
    }
}