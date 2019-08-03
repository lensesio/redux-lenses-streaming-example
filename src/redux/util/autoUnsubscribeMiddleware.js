import { Actions as KafkaActions } from 'redux-lenses-streaming';

const middleware = store => next => action => {
  const result = next(action);

  const { dispatch, getState } = store;
  const { lenses, session } = getState();

  const { messages = [] } = session;
  const { subscriptions = [] } = lenses;
  const { type: actionType } = action;

  if (actionType !== KafkaActions.unsubscribe() && messages.length >= 15000 && subscriptions.length >= 1) {
    dispatch(
      KafkaActions.unsubscribe({ topics: lenses.subscriptions })
    );
  }

  return result;
}

export default middleware;
