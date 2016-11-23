const isColor = require('is-color');

import notFound from './notFound';
import canonize from './canonize';

export default async function mongo_practice3(req, res) {
  try {
    let usersColor = req.query.color;
    console.log('input color: ', usersColor, '  length color: ', usersColor.length);
    usersColor = usersColor.toLowerCase();
    usersColor = canonize(usersColor);
    if (!/[rgb]/.test(usersColor) && !/[hsl]/.test(usersColor)) {
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
        default:
          notFound(res, 'Invalid color', 500);
          break;
      }
    }
    console.log('color: ', usersColor, '  lib say: ', isColor(usersColor), '\n--------------');
    if (isColor(usersColor) === true) {
      res.send (usersColor);
    } else {
      notFound(res, 'Invalid color', 500);
    }
  } catch (err) {
    console.log('Error in main2d: ', err);
  }
};
