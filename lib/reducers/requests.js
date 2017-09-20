'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reduxActions = require('redux-actions');

exports.default = (0, _reduxActions.handleActions)({
	START_REQUEST: function START_REQUEST(state, action) {
		return state + 1;
	},
	END_REQUEST: function END_REQUEST(state, action) {
		return state - 1;
	}
}, 0);
//# sourceMappingURL=requests.js.map