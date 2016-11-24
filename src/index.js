import express from 'express';
import cors from 'cors';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    hello: 'Hi world!'
  });
});

const secret = 'firstTest-secret';

app.get('/token', // Почему он не написал стрелочную функцию как обычно?
  function(req, res) {
    const data = {
      user: 'dns2316',
      name: 'Dns 2316'
    };
    return res.json(jwt.sign(data, secret));
  });

app.get('/protected',
  expressJwt({secret}),
  function(req,res) {
    return res.json(req.user)
  });

app.listen(3000, () => {
  console.log('App was run on port 3000!');
});
