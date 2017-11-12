import { createAction } from 'redux-actions';

import * as application from './application';
import * as request from './request';
import { Database } from '../database';

export const open = (database, password, keyFile = undefined) => dispatch => {
	dispatch(request.start());

	let db = new Database(database);
	db.open(password, keyFile).then(() => {
		dispatch(request.end());
		dispatch(load(db.findEntries()));
		dispatch(application.unlock());
	});
};

export const load = createAction('database:load', entries => entries);

export const unload = createAction('database:unload');

export const addEntry = createAction('database:addEntry', entry => entry);
