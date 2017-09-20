import update from 'immutability-helper';
import { handleActions } from 'redux-actions';

export default handleActions(
	{
		ADD_ENTRY: (state, { type, payload }) =>
			update(state, {
				$push: [payload],
			}),
	},
	[],
);
