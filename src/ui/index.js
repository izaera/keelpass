import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { loadEntries } from '../actions';
import App from './components/App';
import reducers from '../reducers';

const store = createStore(
	reducers,
	applyMiddleware(thunkMiddleware /*, createLogger()*/),
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);

store.dispatch(loadEntries());
/**************************************/

// var db = new Database('sample-keepass-db.kdbx');
// db.open('password').then(() => ...);
