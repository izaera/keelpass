import { createAction } from 'redux-actions';

export const loadEntries = () => dispatch => {
	const delay = Math.random() * 5000;

	dispatch(startRequest());
	dispatch(
		addEntry({
			id: '065EF8F6-AE15-408F-AE44-C3991215CCDE',
			title: 'Google',
			icon: '1',
			url: 'https://google.com',
			userName: 'user',
			password: 'password',
		}),
	);
	dispatch(endRequest());
};

export const addEntry = createAction('ADD_ENTRY', entry => entry);

export const startRequest = createAction('START_REQUEST');

export const endRequest = createAction('END_REQUEST');
