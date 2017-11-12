import { combineReducers } from 'redux';

import application from './application';
import database from './database';
import request from './request';

export default combineReducers({
	application,
	database,
	request,
});
