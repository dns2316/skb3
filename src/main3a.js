import notFound from './notFound';
import requestPc from './pc';

export default async function main3a(req, res) {
  try {
    const pc = await requestPc();
    console.log('pc in main3a: ', pc);

    const toType = obj =>
      ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();

    console.log(req.url);
    console.log(req.url.split('/'));

    const parts = req.url.split('/')
      .filter(el => el).slice(1)
      .reduce((prev, curr) => {
        if (toType(prev) === 'object') {
          if ({}.hasOwnProperty.call(prev, curr)) {
            return prev[curr];
          }
        } else if (toType(prev) === 'array') {
          if (!isNaN(curr)) {
            return prev[curr];
          }
        }
          return undefined;
      }, pc);
    console.log(pc);
    console.log(parts);
    if (parts === undefined) {
      notFound(res);
    }
    res.json(parts);
  }
  catch (e) {
    console.error('Error when get main3a', e, e.stack)
  }
}

// logs
// App listening on port 80!
// pc in main3a:  undefined
// /3a
// [ '', '3a' ]
// undefined
// undefined
// express deprecated res.send(body, status): Use res.status(status).send(body) instead src\notFound.js:8:20
// (node:7184) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1):
// FetchError: request to https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json failed, reason: connect ETIMEDOUT 151.101.16.133:443
