import express from 'express';
import cors from 'cors';

// ======= import 2d color =======
import main2d from './main2d';
// ======= end import 2d color =======

const app = express();
app.use(cors());

// ======= 3A =======
app.get('/2d', main2d);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
