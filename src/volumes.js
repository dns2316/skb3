import notFound from './notFound';
import requestPc from './pc';

export default async function volumes(req, res) {
  try {
    const pc = requestPc()
    const hddVolumes = {}

    if (pc.hdd) {
      pc.hdd.forEach(({ volume, size }) => {
        if (typeof hddVolumes[volume] === 'undefined') hddVolumes[volume] = 0
        hddVolumes[volume] += size
      })
    }

    Object.keys(hddVolumes).forEach(volume => {
      console.log(`${volume} | ${hddVolumes[volume]}B`)
    })
  }
  catch (e) {
    console.error('Error when get volumes', e, e.stack)
  }
}

// ======

const old = async (req, res) => {
  let pc = await pc();

  console.log('start volumes', pc);
  console.log('start volumes', pc.hdd);
  // "тупо проходим по всем его элементам, и в новый массив суммируем по следующей логике sums[pc.hdd[x].volume] += pc.hdd[x].size"
  if (pc.hdd) { //  Канкатенацией можно обращатся к json`у как к массиву?! +1 к знаниям. ||| "элемент pc.hdd является массивом"
    const resultVolumes = {};
    console.log('resultVolumes.41 line: ', resultVolumes);
    /* const relustVolumes = {}; Object: объекты, массивы и функции. Объявлен пустой объект.
      relustVolumes.bar = 42; Потому что bar это не значение relustVolumes, а его свойство */
    pc.hdd.map( (item) => { //.map - Синтаксис arr.map(callback[, thisArg]). Метод map() создаёт новый массив с результатом вызова указанной функции для каждого элемента массива.
      console.log('item.45 line: ', item); //если объект выводить через "," а не через "+"!
      if (resultVolumes[item.volume]) {
        console.log(item.volume)
        resultVolumes[item.volume] += item.size;
      } else {
        resultVolumes[item.volume] = item.size;
        console.log(item.volume)
      }
    });

/*
new logs
resultVolumes.41 line:  {}
item.45 line:  { vendor: 'Samsung', size: 33554432, volume: 'C:' }
C:
item.45 line:  { vendor: 'Maxtor', size: 16777216, volume: 'D:' }
D:
item.45 line:  { vendor: 'Maxtor', size: 8388608, volume: 'C:' }
C:
|resultVolumes:  { 'C:': 41943040, 'D:': 16777216 } |type:  object |type "pc":  object

logs
resultVolumes.41 line:  {}
item.45 line:  { vendor: 'Samsung', size: 33554432, volume: 'C:' }
C: { 'C:': 33554432 } { vendor: 'Samsung', size: 33554432, volume: 'C:' }
item.45 line:  { vendor: 'Maxtor', size: 16777216, volume: 'D:' }
D: { 'C:': 33554432, 'D:': 16777216 } { vendor: 'Maxtor', size: 16777216, volume: 'D:' }
item.45 line:  { vendor: 'Maxtor', size: 8388608, volume: 'C:' }
C: { 'C:': 33554432, 'D:': 16777216 } { vendor: 'Maxtor', size: 8388608, volume: 'C:' }
|resultVolumes:  { 'C:': 41943040, 'D:': 16777216 } |type:  object |type "pc":  object

old logs
resultVolumes.41 line:  {}
item.45 line:  { vendor: 'Samsung', size: 33554432, volume: 'C:' }
else resultVolumes.line 54:  { 'C:': 33554432 } size:  33554432
item.45 line:  { vendor: 'Maxtor', size: 16777216, volume: 'D:' }
else resultVolumes.line 54:  { 'C:': 33554432, 'D:': 16777216 } size:  16777216
item.45 line:  { vendor: 'Maxtor', size: 8388608, volume: 'C:' }
resultVolumes.47 line:  { 'C:': 33554432, 'D:': 16777216 } size:  8388608
resultVolumes.50 line:  { 'C:': 41943040, 'D:': 16777216 } size:  8388608
|resultVolumes:  { 'C:': 41943040, 'D:': 16777216 } |type:  object |type "pc":  object

 В 3a/volumes - item, потому, что:

Метод «arr.forEach(callback[, thisArg])» используется для перебора массива.

Он для каждого элемента массива вызывает функцию callback.

Этой функции он передаёт три параметра callback(item, i, arr):

item – очередной элемент массива.
i – его номер.
arr – массив, который перебирается.
Например:

var arr = ["Яблоко", "Апельсин", "Груша"];

arr.forEach(function(item, i, arr) {
  alert( i + ": " + item + " (массив:" + arr + ")" );
});
.
*/

    console.log('|resultVolumes: ', resultVolumes, '|type: ', typeof(resultVolumes), '|type "pc": ', typeof(pc));

    Object.keys(resultVolumes).forEach( (key) => { //`a = {}` это то же самое что `a = new Object()`. `Object` - это ссылка на прототип, у него есть метод `keys`, он возвращает ключи объекта, который ты даёшь в роли аргумента.
      console.log('Начало Object.keys(resultVolumes).forEach( (key)');
      console.log(resultVolumes); //{ 'C:': 41943040, 'D:': 16777216 }
      console.log(key);//C:
      /*
      "это итерирование по свойствам объекта
      Object.keys(Obj) возвращает все ключи (названия свойств) объекта Obj в виде массива.
      Далее forEach проходит по каждому элементу массива.
      Можно было и через .map решить".
      resultVolumes это объект, у которого свойства - буквы дисков, и значения этих свойств - суммы сайзов дисков
      */
      resultVolumes[key] += 'B'; // B - ? ||| "потому что в тестах там где /volumes он ждет после величин букву B, что означает байт". "obj.C, obj['C'], a='C'; obj[a] одно и тоже".
      console.log(resultVolumes[key]);//41943040B. resultVolumes это size диска [key]. В js в квадратных скобках может писатся только индекс, свойство объекта.
    })
/*
logs
Начало Object.keys(resultVolumes).forEach( (key)
{ 'C:': 41943040, 'D:': 16777216 }
C:
41943040B
Начало Object.keys(resultVolumes).forEach( (key)
{ 'C:': '41943040B', 'D:': 16777216 }
D:
16777216B
*/
  res.json(resultVolumes);
  } else {
  // res.send('Enter correct request!');
  notFound(res);
  }
}
