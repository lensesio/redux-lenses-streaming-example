import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/';
import { Type } from '../actions';

function configureStore() {
  const logger = createLogger({
    collapsed: true,
    predicate: (getState, action) => action.type !== Type.UPDATE_PASSWORD
  });

  const middleware = [logger];

  const store = createStore(
    rootReducer,
    applyMiddleware(...middleware),
  );

  return store;
}

export default configureStore;
