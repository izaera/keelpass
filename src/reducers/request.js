import update from 'immutability-helper';
import { handleActions } from 'redux-actions';

export default handleActions(
	{
		'request:start': (state, action) =>
			update(state, {
				count: { $set: state.count + 1 },
			}),

		'request:end': (state, action) =>
			update(state, {
				count: { $set: state.count - 1 },
			}),
	},

	{ count: 0 },
);
