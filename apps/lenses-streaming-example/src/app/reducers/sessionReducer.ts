import { Reducer } from 'redux'

import { SessionState } from "../config/state"
import { Action } from "../actions"

export const INITIAL_STATE: SessionState = {
  heartbeatCount: 0,
  messages: [],
  host: '',
  user: '',
  password: '',
};

export const sessionReducer: Reducer<SessionState, Action> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_HOST':
      return { ...state, host: action.payload };
    case 'UPDATE_USER':
      return { ...state, user: action.payload };
    case 'UPDATE_PASSWORD':
      return { ...state, password: action.payload };
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] };
    case 'SHOW_ROW_DETAILS':
      return { ...state, message: action.payload };
    case 'MESSAGE_RECEIVED':
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
}