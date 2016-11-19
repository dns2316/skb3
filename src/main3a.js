import notFound from './notFound';
import requestPc from './pc';

const toType = obj =>
  ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();

export default async function main3a(req, res) {
  try {
    const pc = await requestPc();
    console.log('pc in main3a: ', pc);

    console.log(req.url);
    console.log(req.url.split('/'));

    const parts = req.url.split('/') // Делит строку на массив делителем '/'
      .filter(el => el).slice(1) // Берет элементы с индексом 1+ (0 индекс = 3а)
      .reduce((prev, curr) => { // Перебирает массив prev = 0 индекс, curr = 1 индекс. Прерыдущий индекс и тот который в итерации.
        if (toType(prev) === 'object') {
          /*
          Метод obj.hasOwnProperty(prop) возвращает логическое значение, указывающее, содержит ли объект указанное свойство.

          prop
            Имя проверяемого свойства.

          Каждый объект, произошедший от Object, наследует метод hasOwnProperty. Этот метод может использоваться для определения того,
          содержит ли объект указанное свойство в качестве собственного свойства объекта; в отличие от оператора in, этот метод не проверяет существование свойств
          в цепочке прототипов объекта.

          var foo = {
              hasOwnProperty: function() {
                return false;
              },
              bar: 'Тут драконы'
          };

          foo.hasOwnProperty('bar'); // всегда возвращает false

          Используем метод hasOwnProperty другого объекта и вызываем его с передачей foo в качестве this
          ({}).hasOwnProperty.call(foo, 'bar'); // true

          Также для этих целей можно использовать свойство hasOwnProperty из прототипа Object
          Object.prototype.hasOwnProperty.call(foo, 'bar'); // true
          */
          if ({}.hasOwnProperty.call(prev, curr)) { // Но почему бы не использовать toType?
            return prev[curr];
          }
        } else if (toType(prev) === 'array') {
          if (!isNaN(curr)) {
            return prev[curr];
          }
        }
          return undefined;
      }, pc);
    console.log('pc in main3a: ', pc);
    console.log('parts in main3a: ', parts);
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
