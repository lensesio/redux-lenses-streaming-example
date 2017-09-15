import { combineReducers } from 'redux';
import { lensesReducer } from 'redux-lenses-streaming';
import { sessionReducer } from './sessionReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  lenses: lensesReducer,
});

export default rootReducer;
