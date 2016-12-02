export default async (req, res) => { // Список животных
    const query = req.query;

    if (query) { // Знаю, что не нужно в коде копипастить.
        console.log('in just query ... without populate. /pets');
        if (query.type) { petsSlice = petsSlice.filter(pet => pet.type == query.type); } // берет лист петов из petsList
        if (query.age_gt) { petsSlice = petsSlice.filter(pet => pet.age > query.age_gt); } // берет лист петов из верхней строки (если в url несколько запросов)
        if (query.age_lt) { petsSlice = petsSlice.filter(pet => pet.age < query.age_lt); } // берет лист петов из верхней строки, что бы показать возраст > x >
        return res.json(petsSlice);
    } else if (!query) {
        return res.json(data.pets);
    }
    return notFound(res);
}