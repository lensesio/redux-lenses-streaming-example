import { createStore, applyMiddleware } from 'redux';
import { createLensesMiddleware } from 'redux-lenses-streaming';
import { createLogger } from 'redux-logger';
import { INITIAL_STATE } from '../reducers/sessionReducer'
import rootReducer from '../reducers/';

function configureStore() {
  // We are connecting when the middleware is setup
  // Alternatively we can dispatch the CONNECT action with the same options
  const options = {
    host: INITIAL_STATE.host,
    clientId: INITIAL_STATE.clientId,
  };

  const lensesWsMiddleware = createLensesMiddleware(options);
  const logger = createLogger({ 
    collapsed: true 
  });
  const middleware = [logger, lensesWsMiddleware];

  const store = createStore(
    rootReducer,
    applyMiddleware(...middleware),
  );

  return store;
}

export default configureStore;
