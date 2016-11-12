(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('express'), require('cors'), require('isomorphic-fetch')) :
  typeof define === 'function' && define.amd ? define(['babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'express', 'cors', 'isomorphic-fetch'], factory) :
  (factory(global._regeneratorRuntime,global._asyncToGenerator,global.express,global.cors,global.fetch));
}(this, (function (_regeneratorRuntime,_asyncToGenerator,express,cors,fetch) { 'use strict';

_regeneratorRuntime = 'default' in _regeneratorRuntime ? _regeneratorRuntime['default'] : _regeneratorRuntime;
_asyncToGenerator = 'default' in _asyncToGenerator ? _asyncToGenerator['default'] : _asyncToGenerator;
express = 'default' in express ? express['default'] : express;
cors = 'default' in cors ? cors['default'] : cors;
fetch = 'default' in fetch ? fetch['default'] : fetch;

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

})));
//# sourceMappingURL=index.umd.js.map
