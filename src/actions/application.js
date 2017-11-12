import { createAction } from 'redux-actions';

export const lock = createAction('application:lock');

export const unlock = createAction('application:unlock');
