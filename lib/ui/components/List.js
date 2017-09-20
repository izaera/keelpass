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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = function List(_ref) {
	var items = _ref.items,
	    fields = _ref.fields;
	return _react2.default.createElement(
		'ul',
		null,
		items.map(function (item) {
			return _react2.default.createElement(
				'li',
				null,
				item[fields.label]
			);
		})
	);
};

List.propTypes = {
	items: _propTypes2.default.array.isRequired,
	fields: _propTypes2.default.isRequired
};

exports.default = List;
//# sourceMappingURL=List.js.map