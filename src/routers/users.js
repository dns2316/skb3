import {havePet} from "../functions";

export default async (req, res) => { // Cписок пользователей
    const query = req.query;

    try {
        if (query.havePet) { usersSlice = havePet(data, query.havePet); }
        return res.json(usersSlice);
    } catch (err) {
        console.log('err in /user: ', err);
    }
}