import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import AppContainer from './containers/AppContainer';
import * as application from '../actions/application';
import reducers from '../reducers';

const store = createStore(
	reducers,
	applyMiddleware(thunkMiddleware, createLogger()),
);

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	document.getElementById('root'),
);
