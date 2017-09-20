import { combineReducers } from 'redux';
import entries from './entries';
import requests from './requests';

export default combineReducers({
	entries,
	requests,
});
