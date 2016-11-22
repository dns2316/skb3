import express from 'express';
import cors from 'cors';

// Почистить canonize оставить там только обработку ссылки (или вообще убрать canonize и использовать 'color =').
// Заюзать библиотеку https://github.com/morishitter/is-color

// ======= import 2d color =======
import main2d from './main2d';
// ======= end import 2d color =======


const app = express();
app.use(cors());

// ======= 3A =======
// app.get('/3a/volumes', volumes);
// app.get('/3a(/*)?', main3a);
// app.get('/3practice/:userballs', mongo_practice3);
app.get('/2d', main2d);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
