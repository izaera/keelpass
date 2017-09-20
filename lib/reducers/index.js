'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _entries = require('./entries');

var _entries2 = _interopRequireDefault(_entries);

var _requests = require('./requests');

var _requests2 = _interopRequireDefault(_requests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
	entries: _entries2.default,
	requests: _requests2.default
});
//# sourceMappingURL=index.js.map