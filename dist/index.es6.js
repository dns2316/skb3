import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';

var _this = undefined;

var app = express();
app.use(cors());

// ======= 3A =======
var pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
var pc = {};
fetch(pcUrl).then(function () {
  var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(res) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return res.json();

          case 2:
            pc = _context.sent;

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()).catch(function (err) {
  console.log('Error: ', err);
});

app.get('/3a', function (req, res) {
  res.json({
    hello: 'JS World'
  });
});

app.listen(80, function () {
  console.log('App listening on port 80!');
});
//# sourceMappingURL=index.es6.js.map
