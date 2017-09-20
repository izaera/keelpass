'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.endRequest = exports.startRequest = exports.addEntry = exports.loadEntries = undefined;

var _reduxActions = require('redux-actions');

var loadEntries = exports.loadEntries = function loadEntries() {
	return function (dispatch) {
		var delay = Math.random() * 5000;

		dispatch(startRequest());
		dispatch(addEntry({
			id: '065EF8F6-AE15-408F-AE44-C3991215CCDE',
			title: 'Google',
			icon: '1',
			url: 'https://google.com',
			userName: 'user',
			password: 'password'
		}));
		dispatch(endRequest());
	};
};

var addEntry = exports.addEntry = (0, _reduxActions.createAction)('ADD_ENTRY', function (entry) {
	return entry;
});

var startRequest = exports.startRequest = (0, _reduxActions.createAction)('START_REQUEST');

var endRequest = exports.endRequest = (0, _reduxActions.createAction)('END_REQUEST');
//# sourceMappingURL=index.js.map