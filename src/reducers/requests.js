import { handleActions } from 'redux-actions';

export default handleActions(
	{
		START_REQUEST: (state, action) => state + 1,
		END_REQUEST: (state, action) => state - 1,
	},
	0,
);
