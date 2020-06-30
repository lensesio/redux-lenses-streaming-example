import { createReducer } from 'reduxsauce';
import { Type } from '../actions';

export const INITIAL_STATE = {
  heartbeatCount: 0,
  messages: [],
  host: '',
  user: '',
  password: '',
  message: {}
};

const onUpdateHost = (state, action) => Object.assign({}, state, { host: action.payload });
const onUpdateUser = (state, action) => Object.assign({}, state, { user: action.payload });
const onUpdatePassword = (state, action) => Object.assign({}, state, { password: action.payload });
const onClearMessages = (state, action) => Object.assign({}, state, { messages: [] });
const onShowRowDetails = (state, action) => Object.assign({}, state, { message: action.payload });

// const onKafkaHeartbeat = state => Object.assign({}, state,
//   { heartbeatCount: state.heartbeatCount + 1 });
const onKafkaMessage = (state, action) => {
  let messages = (action.payload && action.payload.content) || [];
  return Object.assign({}, state,
    { messages: state.messages.concat(messages) });
};

// map our types to our handlers
const ACTION_HANDLERS = {
  [Type.UPDATE_HOST]: onUpdateHost,
  [Type.UPDATE_USER]: onUpdateUser,
  [Type.UPDATE_PASSWORD]: onUpdatePassword,
  [Type.CLEAR_MESSAGES]: onClearMessages,
  [Type.SHOW_ROW_DETAILS]: onShowRowDetails
};

export const sessionReducer = createReducer(INITIAL_STATE, ACTION_HANDLERS);
