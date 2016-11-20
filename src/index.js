import express from 'express';
import cors from 'cors';

// ======= import 3A =======
// import volumes from './3a/volumes';
// import main3a from './3a/main3a';
// ======= end import 3A =======

// ======= import 3 practice =======
import mongo_practice3 from './3mongo_practice/main3video';
// ======= end import 3 practice =======

const app = express();
app.use(cors());

// ======= 3A =======
// app.get('/3a/volumes', volumes);
// app.get('/3a(/*)?', main3a);
app.get('/3practice/:userballs', mongo_practice3);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
