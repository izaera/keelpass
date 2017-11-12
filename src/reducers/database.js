import update from 'immutability-helper';
import { handleActions } from 'redux-actions';

export default handleActions(
	{
		'database:load': (state, { payload }) =>
			update(state, {
				loaded: { $set: true },
				entries: { $push: [payload] },
			}),

		'database:unload': state =>
			update(state, {
				loaded: { $set: false },
				entries: { $set: [] },
			}),

		'database:addEntry': (state, { payload }) =>
			update(state, {
				entries: { $push: [payload] },
			}),
	},

	{ loaded: false, entries: [] },
);
