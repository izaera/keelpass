import update from 'immutability-helper';
import { handleActions } from 'redux-actions';

export default handleActions(
	{
		'application:lock': state =>
			update(state, {
				locked: { $set: true },
			}),

		'application:unlock': state =>
			update(state, {
				locked: { $set: false },
			}),
	},

	{ locked: true },
);
