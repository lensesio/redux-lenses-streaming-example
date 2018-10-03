import { createStore, applyMiddleware } from 'redux';
import { createLensesMiddleware } from 'redux-lenses-streaming';
import { createLogger } from 'redux-logger';
import { INITIAL_STATE } from '../reducers/sessionReducer'
import rootReducer from '../reducers/';
import { Type } from '../actions';

function configureStore() {
  // We are connecting when the middleware is setup
  // Alternatively we can dispatch the CONNECT action with the same options
  // For a full list of supported options, see documentation
  const options = {
    host: INITIAL_STATE.host,
    clientId: INITIAL_STATE.clientId,
  };

  const lensesWsMiddleware = createLensesMiddleware(options);
  const logger = createLogger({ 
    collapsed: true,
    predicate: (getState, action) => action.type !== Type.UPDATE_PASSWORD
  });

  const middleware = [logger, lensesWsMiddleware];

  const store = createStore(
    rootReducer,
    applyMiddleware(...middleware),
  );

  return store;
}

export default configureStore;
