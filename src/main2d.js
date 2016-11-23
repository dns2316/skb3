const isColor = require('is-color');
const color = require('onecolor');

import canonize from './canonize';
import checkRgb from './checkRgb';
import checkHls from './checkHls';

export default async function mongo_practice3(req, res) {
  try {
    let usersColor = req.query.color; // берем инфу из url. 	http://localhost:3000/2d?color=hsl(195, 100%, 50%) => hsl(195, 100%, 50%);
    if (usersColor && !/##/.test(usersColor)) { // Если есть инфа из color= и в ней нету ##, то продолжать работу кода.
      console.log('input color: ', usersColor, '  length color: ', usersColor.length);
      // if (/hsl/.test(usersColor) && !/#/.test(usersColor)) { // Поставил сюда функцию для удаления пробелов из hsl, что бы он чистил ее до нижнего регистра.
      //   usersColor = usersColor.replace(/%20{2}*/g, '');
      // }
      usersColor = usersColor.toLowerCase(); // Перевести инфу в нижний регистр.

      function rgbToHex(colorUse) { // Проверяем, что бы цифры в rgb были по правилам =< 255!
        try {
          if (checkRgb(colorUse) == true) {
          const hex = color(colorUse).hex();
          console.log('func: ', hex);
            return hex;
          }
        } catch (err) {
          console.log('error in rgbToHex: rgb have number > 255');
        }
      };

      function hlsToHex(colorUse) { // Проверяем, что бы проценты в hls были =< 100%!
        try {
          if (checkHls(colorUse) == true) {
          const hex = color(colorUse).hex();
          console.log('func: ', hex);
            return hex;
          }
        } catch (err) {
          console.log('error in hlsToHex: hls have number > 100%');
        }
      };

      if (!/rgb/.test(usersColor) && !/hsl/.test(usersColor)) { // Не rgb и не hsl, = abc => #aabbcc; abcdef => #adcbef.
        usersColor = canonize(usersColor); // Функция убирает из запроса пробелы и #!
        switch (usersColor.length){
          case 3:
            usersColor = '#' +
            usersColor[0] + usersColor[0] +
            usersColor[1] + usersColor[1] +
            usersColor[2] + usersColor[2];
            break;
          case 6:
            usersColor = '#' + usersColor;
            break;
        }
      } else if (/rgb/.test(usersColor) && !/#/.test(usersColor)) {// Если rgb и без # тогда переводит его в hex!
        usersColor = usersColor.replace(/\s*/, ''); // Для изящного кода - вынести повторяющиеся куски кода в функции.
        usersColor = rgbToHex(usersColor);
      } else if (/hsl/.test(usersColor) && !/#/.test(usersColor)) { // Если hsl и без # тогда переводит его в hex!
        usersColor = usersColor.replace(/%20{1}/g, '');
        console.log('Удалить пробелы! ', usersColor);
        usersColor = hlsToHex(usersColor);
      }
      console.log('color: ', usersColor, '  lib say: ', isColor(usersColor), '\n--------------');
      if (isColor(usersColor) === true) { // Если библиотека isColor подтверждает, что код цвета правильный, то отправляет в браузер этот код. Или говорит, что код цвета не правильный.
        res.send (usersColor);
      } else {
        res.send('Invalid color');
      }
    } else {
      console.log('\n--------------\ncolor != ', req.url, '\n--------------');
      res.send('Invalid color');
    }
  } catch (err) {
    console.log('Error in main2d: ', err);
  }
};
