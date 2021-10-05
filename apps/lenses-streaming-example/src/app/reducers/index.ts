import { combineReducers } from 'redux'
import { sessionReducer as session } from './sessionReducer'

import { Action } from '../actions'
import { State } from '../config/state'

export const rootReducer = combineReducers<State, Action>({
  session,
});