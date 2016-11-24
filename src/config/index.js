global.__DEV__ = true;
//__STAGE__ // wtf?
global.__PROD__ = false;

export default {
  name: 'Your super app',
  port: 3000,
  db: {
    url: 'mongodb://publicdb.mgbeta.ru/dns2316_practice4',
  },
  jwt: {
    secret: 'YOUR_SECRET'
  }
};
