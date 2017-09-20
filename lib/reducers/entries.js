'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _reduxActions = require('redux-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reduxActions.handleActions)({
	ADD_ENTRY: function ADD_ENTRY(state, _ref) {
		var type = _ref.type,
		    payload = _ref.payload;
		return (0, _immutabilityHelper2.default)(state, {
			$push: [payload]
		});
	}
}, []);
//# sourceMappingURL=entries.js.map