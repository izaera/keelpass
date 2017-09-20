'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _appbar = require('muicss/lib/react/appbar');

var _appbar2 = _interopRequireDefault(_appbar);

var _button = require('muicss/lib/react/button');

var _button2 = _interopRequireDefault(_button);

var _container = require('muicss/lib/react/container');

var _container2 = _interopRequireDefault(_container);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _EntriesList = require('../containers/EntriesList');

var _EntriesList2 = _interopRequireDefault(_EntriesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(_appbar2.default, null),
		_react2.default.createElement(
			_container2.default,
			null,
			_react2.default.createElement(_EntriesList2.default, null)
		)
	);
};
//# sourceMappingURL=App.js.map