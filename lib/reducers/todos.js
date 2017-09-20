'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _reduxActions = require('redux-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reduxActions.handleActions)({
	ADD_TODO: function ADD_TODO(state, _ref) {
		var type = _ref.type,
		    payload = _ref.payload;
		return (0, _immutabilityHelper2.default)(state, {
			$push: [{
				id: payload.id,
				text: payload.text,
				completed: false
			}]
		});
	},

	TOGGLE_TODO: function TOGGLE_TODO(state, _ref2) {
		var type = _ref2.type,
		    payload = _ref2.payload;
		return state.map(function (todo) {
			return todo.id === payload.id ? (0, _immutabilityHelper2.default)(todo, {
				completed: { $set: !todo.completed }
			}) : todo;
		});
	}
}, []);
//# sourceMappingURL=todos.js.map