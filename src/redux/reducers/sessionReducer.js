import { createReducer } from 'reduxsauce';
import { Type as KafkaType } from 'redux-lenses-streaming';
import { Type } from '../actions';

export const INITIAL_STATE = {
  heartbeatCount: 0,
  messages: [],
  host: '',
  clientId: '',
  user: '',
  password: '',
  message: {}
};

const onUpdateHost = (state, action) => ({ ...state, host: action.payload });
const onUpdateClientId = (state, action) => ({ ...state, clientId: action.payload });
const onUpdateUser = (state, action) => ({ ...state, user: action.payload });
const onUpdatePassword = (state, action) => ({ ...state, password: action.payload });
const onClearMessages = (state) => ({ ...state, messages: [] });
const onShowRowDetails = (state, action) => ({ ...state, message: action.payload });
const onConnectSuccess = state => ({ ...state, heartbeatCount: 0 });
const onKafkaHeartbeat = state => ({ ...state, heartbeatCount: state.heartbeatCount + 1 });
const onKafkaMessage = (state, action) => {
  const messages = (action.payload && action.payload.content) || [];

  return { ...state, messages: state.messages.concat(messages) };
};

// map our types to our handlers
const ACTION_HANDLERS = {
  [Type.UPDATE_HOST]: onUpdateHost,
  [Type.UPDATE_CLIENT_ID]: onUpdateClientId,
  [Type.UPDATE_USER]: onUpdateUser,
  [Type.UPDATE_PASSWORD]: onUpdatePassword,
  [Type.CLEAR_MESSAGES]: onClearMessages,
  [Type.SHOW_ROW_DETAILS]: onShowRowDetails,
  [KafkaType.KAFKA_HEARTBEAT]: onKafkaHeartbeat,
  [KafkaType.KAFKA_MESSAGE]: onKafkaMessage,
  [KafkaType.CONNECT_SUCCESS]: onConnectSuccess,
};

export const sessionReducer = createReducer(INITIAL_STATE, ACTION_HANDLERS);
