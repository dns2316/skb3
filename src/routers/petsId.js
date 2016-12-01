export default async (req, res) => { // params id or username. Поиск животного по его ID
    let answer = null;
    const paramsId = req.params.id;
    const query = req.query;

    try {
        // const ageGt = req.query.age_gt; // Возраст животных, старше age_gt месяцев
        // const ageLt = req.query.age_lt; // Возраст животных, младше age_lt месяцев
        if (paramsId == 'populate') {
            if (query.type) { petsSlice = petsSlice.filter(pet => pet.type == query.type); } // берет лист петов из petsList
            if (query.age_gt) { petsSlice = petsSlice.filter(pet => pet.age > query.age_gt); } // берет лист петов из верхней строки (если в url несколько запросов)
            if (query.age_lt) { petsSlice = petsSlice.filter(pet => pet.age < query.age_lt); } // берет лист петов из верхней строки, что бы показать возраст > x >
            console.log('in pets/populate');
            petsSlice = petsSlice.map(pet => ({ // в подготовленый лист петов добавляет их юзеров.
                ...pet,
                user: usersSlice.filter(user => pet.userId === user.id )[0]
            }));
            return res.json(petsSlice);
        }
        if (/[\d]+/.test(paramsId)) { // даже если отправить /pets/0 - /[1-9]*/.test скажет true. o_O
            answer = searchById(paramsId, 'pets', data); // просто поиск по id пета
            if (answer) {
                return res.json(answer);
            }
        }
        return notFound(res);
    } catch (err) {
        console.log('/pets catch: ', err);
        return notFound(res);
    }
}